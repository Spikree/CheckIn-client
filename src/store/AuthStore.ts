import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface AuthStore {
  login: (formData: { email: string; password: string }) => Promise<void>;
  signup: () => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;

  authUser: { id: string; username: string; role: string } | null;

  isCheckingAuth: boolean;
}

export const AuthStore = create<AuthStore>((set) => ({
  isCheckingAuth: false,
  authUser: null,
  login: async (formData: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", formData);
      console.log(response);
      set({ authUser: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Login failed. Please try again.";
      console.log(errorMessage);
    }
  },

  signup: async () => {
    try {
      const response = await axiosInstance.get("/api/auth/register");
      console.log(response);
    } catch {
      console.log("error");
    }
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/api/auth/me");
      console.log(response.data);
      set({ isCheckingAuth: true });
      set({ authUser: response.data });
    } catch {
      console.log("error");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      const response = axiosInstance.post("/api/auth/logout");
      console.log(response);
      set({ authUser: null });
    } catch {
      console.log("error");
    }
  },
}));
