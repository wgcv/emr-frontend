import { PaginationData } from "./Pagination.types";

export interface Clinic {
    id?: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    zipcode: string;
    phone: string;
    email: string;
  }


  
  export interface GetClinicResponse {
    clinics: Clinic[];
    pagination: PaginationData;
  }
  