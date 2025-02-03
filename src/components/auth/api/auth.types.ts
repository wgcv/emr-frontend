import { axiosClient } from '@lib/axios/axios-client';
import Cookies from 'js-cookie';
import { AuthResponse } from '../types/AuthResponse';
import { LoginCredentials } from '../types/LoginCredentials';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>('/auth/login', credentials)
  Cookies.set('accessToken', data.accessToken, { 
    secure: true,
    sameSite: 'strict',
    expires: 1/24 // 1 hour
  })

  Cookies.set('refreshToken', data.refreshToken, { 
    secure: true,
    sameSite: 'strict',
    expires: 30 // 30 days
  })
  Cookies.set('role', data.user.role, { 
    secure: true,
    sameSite: 'strict',
    expires: 30 // 30 days
  })
  return data
}

export const logout = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  Cookies.remove('role')

}

export const getToken = (): string | undefined => {
  return Cookies.get('accessToken')
}


export const getRole = (): string | undefined => {
  return Cookies.get('role')
}
