import { User } from "../../types/User";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }