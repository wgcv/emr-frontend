import { ClinicUser } from '@/components/types/User.types';
import { axiosClient } from '@lib/axios/axios-client';
import { Clinic, GetClinicResponse } from "../types/Clinic.types";

export const createClinic = async (clinic: Clinic): Promise<Clinic> => {
  const { data } = await axiosClient.post<{ clinic: Clinic; message: string }>('/clinics', clinic)
  return data.clinic
};

export const updateClinic = async (id: string,clinic: Clinic): Promise<Clinic> => {
  const { data } = await axiosClient.put<{ clinic: Clinic; message: string }>(`/clinics/${id}`, clinic)
  return data.clinic
};

export const getClinic = async (id: string): Promise<Clinic> => {
  const { data } = await axiosClient.get<Clinic>(`/clinics/${id}`);
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
export const searchClinics = async (page: number, rowsPerPage: number, search?: string): Promise<GetClinicResponse> => {
  const params = {
    page: page + 1,
    limit: rowsPerPage,
    ...(search && { search })
  };

  const { data } = await axiosClient.get<GetClinicResponse>('/clinics', { params });
  return data;
};

export const inviteClinicOwner = async (user: ClinicUser): Promise<ClinicUser> => {
  const { data } = await axiosClient.post<{ user: ClinicUser; message: string }>(`/clinics/owner`, user)
  return data.user
};
