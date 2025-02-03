import { axiosClient } from '@lib/axios/axios-client';
import { Clinic, GetClinicResponse } from "../types/Clinic.types";


export const createClinic = async (clinic: Clinic): Promise<Clinic> => {
  const { data } = await axiosClient.post<Clinic>('/clinics', clinic)
  return data
};

export const getClinics = async (page: number, rowsPerPage: number, search?: string): Promise<GetClinicResponse> => {
  const params = {
    page: page + 1,
    limit: rowsPerPage,
    ...(search && { search })
  };
  
  const { data } = await axiosClient.get<GetClinicResponse>('/clinics', { params });
  return data;
};
