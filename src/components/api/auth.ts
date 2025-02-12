import { axiosClient } from '@lib/axios/axios-client';
import Cookies from 'js-cookie';
import { AuthResponse } from '../auth/types/AuthResponse';
import { LoginCredentials } from '../auth/types/LoginCredentials';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>('/auth/login', credentials)
  setToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  Cookies.set('actor', data.user.actor || 'petOwner', { 
    secure: true,
    sameSite: 'strict',
    expires: 30 // 30 days
  })
  return data
}

export const logout = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  Cookies.remove('actor')

}
export const setToken = (accessToken : string) => {
   Cookies.set('accessToken', accessToken, { 
    secure: true,
    sameSite: 'strict',
    // expires: (1/24) // 1 hour
    expires: (10/86400) // 1 second (1 day = 86400 seconds)

  })
}

export const setRefreshToken = (refreshToken : string) => {
  Cookies.set('refreshToken', refreshToken, { 
    secure: true,
    sameSite: 'strict',
    expires: 30 // 30 days
  })
}

export const getToken = (): string | undefined => {
  return Cookies.get('accessToken')
}

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken')
}
export const getActor = (): string | undefined => {
  return Cookies.get('actor')
}
