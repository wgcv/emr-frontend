import { Clinic } from "./Clinic.types";
import { PaginationData } from "./Pagination.types";

export interface User {
      id?: string;
      name: string;
      lastName: string;
      email: string;
      phone: string;
      actor?: string;
      roles?: string[];
      isActive?: boolean;
      createdAt?: string;
      updatedAt?: string;
      resetPasswordExpires?: string;
      resetPasswordToken?: string;
  };


export interface ClinicUser extends User {
    clinic: Clinic;
};
 
  
export interface GetUserResponse {
  users: (User | ClinicUser)[];
  pagination: PaginationData;
  }
  