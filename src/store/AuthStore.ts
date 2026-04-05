import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface AuthStore {
  login: () => Promise<void>;
  signup: () => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthStore = create<AuthStore>(() => ({
  login: async () => {
    try {
      const response = axiosInstance.get("/health");
      console.log(response);
    } catch {
      console.log("error");
    }
  },

  signup: async () => {
    try {
      const response = axiosInstance.get("");
      console.log(response);
    } catch {
      console.log("error");
    }
  },

  checkAuth: async () => {
    try {
      const response = axiosInstance.get("");
      console.log(response);
    } catch {
      console.log("error");
    }
  },

  logout: async () => {
    try {
      const response = axiosInstance.get("");
      console.log(response);
    } catch {
      console.log("error");
    }
  },
}));
