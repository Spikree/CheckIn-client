import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface TestStore {
  hello: string;
  testBackend: () => Promise<void>;
}

export const TestStore = create<TestStore>(() => ({
  hello: "",

  testBackend: async () => {
    try {
      const response = await axiosInstance.get("/health");
      console.log(response);
    } catch {
      console.log("error");
    }
  },
}));
