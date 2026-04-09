import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface ParentStore {
  getStudents: () => Promise<void>;
  addStudent: (targetStudentEmail: string) => Promise<void>;
  getMyPendingRequests: () => Promise<void>;
  cancelPendingRequest: (requestId: string) => Promise<void>;
  getStudentTasks: (studentId: string) => Promise<void>;
  getTasksCompletedByStudent: (studentId: string) => Promise<void>;

  createTaskForStudent: (
    studentId: string,
    title: string,
    description: string,
  ) => Promise<void>;

  studentList: [];
  pendingRequests: [];
  studentTasks: [];
  completedTasksByStudent: [];
}

export const ParentStore = create<ParentStore>((set) => ({
  studentList: [],
  pendingRequests: [],
  studentTasks: [],
  completedTasksByStudent: [],

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

  getMyPendingRequests: async () => {
    try {
      const response = await axiosInstance.get("/api/family/requests/sent");
      console.log(response);
      set({ pendingRequests: response.data });
    } catch (e) {
      console.log(e);
    }
  },

  cancelPendingRequest: async (requestId: string) => {
    try {
      const response = await axiosInstance.delete(
        `/api/family/requests/${requestId}`,
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  },

  createTaskForStudent: async (
    studentId: string,
    title: string,
    description: string,
  ) => {
    const formData = {
      title,
      description,
    };

    try {
      const response = await axiosInstance.post(
        `/api/users/${studentId}/tasks`,
        formData,
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  },

  getStudentTasks: async (studentId: string) => {
    try {
      const response = await axiosInstance(`/api/users/${studentId}/tasks`);
      console.log(response);
      set({ studentTasks: response.data });
    } catch (e) {
      console.log(e);
    }
  },

  getTasksCompletedByStudent: async (studentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/users/${studentId}/tasks/completed`,
      );
      console.log(response);
      set({ completedTasksByStudent: response.data });
    } catch (e) {
      console.log(e);
    }
  },
}));
