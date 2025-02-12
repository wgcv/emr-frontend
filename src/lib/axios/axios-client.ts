import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/components/api/auth'
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios"

// Strong typing for the refresh token response
interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

// Type for queued requests
interface QueueItem {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

// Extend AxiosRequestConfig to include retry flag
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
          // && !originalRequest.url?.includes("/auth/")
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            if (AxiosClient.isRefreshing) {
              try {
                const token = await new Promise<string>((resolve, reject) => {
                  AxiosClient.failedQueue.push({ resolve, reject })
                })
                originalRequest.headers.Authorization = `Bearer ${token}`
                return AxiosClient.instance(originalRequest)
              } catch (err) {
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
              // Clear tokens on refresh failure
              setToken("")
              setRefreshToken("")
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

