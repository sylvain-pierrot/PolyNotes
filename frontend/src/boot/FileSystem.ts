import { api } from "./axios";

export interface Node {
  title: string;
  key: string;
  children?: Node[];
}

export const getFileSystem = async () => {
  try {
    const response = await api.get("/api/users/file-system");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchFileSystem = async (nodeRoot: any) => {
  try {
    const response = await api.patch("/api/users/file-system", nodeRoot);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const logoutUser = async () => {
//   try {
//     const response = await api.post("/api/auth/logout");
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
