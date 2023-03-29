import { Block } from "../store/slices/pageSlice";
import { api } from "./axios";

export const createPage = async (title: string) => {
  try {
    const response = await api.post("/api/pages", { title: title });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create page");
  }
};

export const getPage = async (id: string) => {
  try {
    const response = await api.get(`/api/pages/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get page");
  }
};

export const updatePage = async (
  id: string,
  title: string,
  blocks: Block[]
) => {
  try {
    const response = await api.patch(`/api/pages/${id}`, {
      title: title,
      blocks: blocks,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get page");
  }
};
