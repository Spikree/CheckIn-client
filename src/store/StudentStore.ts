import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface StudentStore {
  addParent: (targetParentEmail: string) => Promise<void>;
  getRequests: () => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;

  requests: [];
}

export const StudentStore = create<StudentStore>((set) => ({
  requests: [],

  addParent: async (targetParentEmail: string) => {
    try {
      const response = await axiosInstance.post("api/family/request", {
        email: targetParentEmail,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
}));
