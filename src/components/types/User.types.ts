export interface User {
      id?: string;
      name: string;
      lastName: string;
      email: string;
      actor?: string;
      roles?: string[];
      isActive?: boolean;
      createdAt?: string;
      updatedAt?: string;
      resetPasswordExpires?: string;
      resetPasswordToken?: string;
  };


export interface ClinicUser {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    actor?: string;
    roles?: string[];
    isActive?: boolean;
    clinic: string;
    createdAt?: string;
    updatedAt?: string;
    resetPasswordExpires?: string;
    resetPasswordToken?: string;
};
  

export const STAFF_ROLE = ["staff"];
export const PET_OWNER_ROLES = ["pet_owner"];
export const CLINIC_ROLES = ["veterinary", "clinic_owner", "assistant", "technician", "basic_vet"];
export const ALL_ROLES = [...STAFF_ROLE, ...PET_OWNER_ROLES, ...CLINIC_ROLES];
