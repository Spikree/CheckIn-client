import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface CommonStore {
  getTaskHistory: (taskId: string) => Promise<void>;

  taskHistory: [];
}

export const CommonStore = create<CommonStore>((set) => ({
  taskHistory: [],

  getTaskHistory: async (taskId: string) => {
    try {
      const response = await axiosInstance.get(`/api/tasks/${taskId}/history`);
      set({ taskHistory: response.data });
    } catch (e) {
      console.log(e);
    }
  },
}));
