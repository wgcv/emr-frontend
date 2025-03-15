import { axiosClient } from '@lib/axios/axios-client';
import { ClinicUser, GetUserResponse, User } from "../types/User.types";



export const getUsers = async (page: number, rowsPerPage: number, search?: string): Promise<GetUserResponse> => {
  const params = {
    page: page + 1,
    limit: rowsPerPage,
    ...(search && { search })
  };

  const { data } = await axiosClient.get<GetUserResponse>('/users', { params });
  return data;
};


export const getUser = async (id: string): Promise<User | ClinicUser> => {
  const { data } = await axiosClient.get<User>(`/users/${id}`);
  return data;
};



export const updateUser = async (id: string, user: User): Promise<User> => {
  const { data } = await axiosClient.put<{ user: User; message: string }>(`/users/${id}`, user)
  return data.user
};
