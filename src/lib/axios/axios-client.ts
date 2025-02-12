import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/components/api/auth'
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios"
import AuthStateManager from "./auth-state"

interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

interface QueueItem {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean
}

class AxiosClient {
  private static instance: AxiosInstance
  private static isRefreshing = false
  private static failedQueue: QueueItem[] = []

  private static processQueue(error: unknown | null, token: string | null = null): void {
    AxiosClient.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error)
      } else if (token) {
        promise.resolve(token)
      }
    })
    AxiosClient.failedQueue = []
  }

  private static handleAuthError(): void {
    // Clear tokens
    setToken("")
    setRefreshToken("")
    // Notify listeners about authentication error
    AuthStateManager.notifyAuthError()
  }

  public static getInstance(): AxiosInstance {
    if (!AxiosClient.instance) {
      AxiosClient.instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      // Request interceptor
      AxiosClient.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const token = getToken()
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        },
        (error) => Promise.reject(error),
      )

      // Response interceptor
      AxiosClient.instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as RetryableRequest

          if (!originalRequest) {
            return Promise.reject(error)
          }

          // Handle unauthorized errors except for auth endpoints
          if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/")) {
            originalRequest._retry = true

            if (AxiosClient.isRefreshing) {
              try {
                const token = await new Promise<string>((resolve, reject) => {
                  AxiosClient.failedQueue.push({ resolve, reject })
                })
                originalRequest.headers.Authorization = `Bearer ${token}`
                return AxiosClient.instance(originalRequest)
              } catch (err) {
                AxiosClient.handleAuthError()
                return Promise.reject(err)
              }
            }

            AxiosClient.isRefreshing = true

            try {
              const refreshToken = getRefreshToken()
              if (!refreshToken) {
                throw new Error("No refresh token available")
              }

              const { data } = await AxiosClient.instance.post<RefreshTokenResponse>("/auth/refresh", { refreshToken })

              const { accessToken, refreshToken: newRefreshToken } = data

              setToken(accessToken)
              setRefreshToken(newRefreshToken)

              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              AxiosClient.processQueue(null, accessToken)

              return AxiosClient.instance(originalRequest)
            } catch (refreshError) {
              AxiosClient.processQueue(refreshError)
              AxiosClient.handleAuthError()
              throw refreshError
            } finally {
              AxiosClient.isRefreshing = false
            }
          }

          return Promise.reject(error)
        },
      )
    }

    return AxiosClient.instance
  }
}

export const axiosClient = AxiosClient.getInstance()

