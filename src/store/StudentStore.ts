import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface StudentStore {
  addParent: (targetParentEmail: string) => Promise<void>;
  getRequests: () => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;

  getTasks: () => Promise<void>;

  requests: [];
  tasks: [];
}

export const StudentStore = create<StudentStore>((set) => ({
  requests: [],
  tasks: [],

  addParent: async (targetParentEmail: string) => {
    try {
      const response = await axiosInstance.post("api/family/request", {
        email: targetParentEmail,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "request failed";
      console.log(errorMessage);
    }
  },

  getRequests: async () => {
    try {
      const response = await axiosInstance.get("/api/family/requests");
      set({ requests: response.data });
    } catch (e) {
      console.log(e);
    }
  },

  acceptRequest: async (requestId) => {
    try {
      const response = await axiosInstance.post(
        `/api/family/requests/${requestId}/accept`,
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  },

  getTasks: async () => {
    try {
      const response = await axiosInstance.get("/api/tasks");
      console.log(response);
      set({ tasks: response.data });
    } catch (e) {
      console.log(e);
    }
  },
}));
