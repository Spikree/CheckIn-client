import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface ParentStore {
  getStudents: () => Promise<void>;
  addStudent: (targetStudentEmail: string) => Promise<void>;

  studentList: [];
}

export const ParentStore = create<ParentStore>((set) => ({
  studentList: [],

  getStudents: async () => {
    try {
      const response = await axiosInstance.get("/api/family/children");
      console.log(response);
      set({ studentList: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "couldnt fetch students";
      console.log(errorMessage);
    }
  },

  addStudent: async (targetStudentEmail: string) => {
    try {
      const response = await axiosInstance.post("api/family/request", {
        email: targetStudentEmail,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
}));
