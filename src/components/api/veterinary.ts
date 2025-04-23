import { axiosClient } from '@lib/axios/axios-client';
import { User } from "../types/User.types";


export const invitationVeterinary = async (user: User): Promise<User> => {
    const { data } = await axiosClient.post<{ user: User; message: string }>(`/veterinarian/invitation`, user)
    return data.user
  };
  