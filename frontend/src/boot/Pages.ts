import { api } from "./axios";

export const createPage = async (title: string) => {
  try {
    const response = await api.post("/api/pages", { title: title });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create page");
  }
};
