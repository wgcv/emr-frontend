import { axiosClient } from '@lib/axios/axios-client';
import { Clinic, GetClinicResponse } from "../types/Clinic.types";

export const createClinic = async (clinic: Clinic): Promise<Clinic> => {
  const { data } = await axiosClient.post<{ clinic: Clinic; message: string }>('/clinics', clinic)
  return data.clinic
};

export const getClinic = async (id: string): Promise<{ clinic: Clinic }> => {
  const { data } = await axiosClient.get<{ clinic: Clinic }>(`/clinics/${id}`);
  return data;
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
