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

  interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  
  export interface GetClinicResponse {
    clinics: Clinic[];
    pagination: PaginationData;
  }
  