import { User } from "../../types/User.types";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }