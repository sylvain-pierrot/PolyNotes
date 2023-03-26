import { api } from "./axios";

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

// export const signupUser = async (user: IUser) => {
//   try {
//     const response = await api.post("/api/users", user);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const loginUser = async (credentials: ICredentials) => {
//   try {
//     const response = await api.post("/api/auth/login", credentials);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const logoutUser = async () => {
//   try {
//     const response = await api.post("/api/auth/logout");
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
