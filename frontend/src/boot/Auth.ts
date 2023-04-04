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

export const signupUser = async (user: IUser) => {
  try {
    const response = await api.post("/api/users", user);
    return response;
  } catch (error) {
    throw new Error("Failed to register");
  }
};

export const loginUser = async (credentials: ICredentials) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    return response;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const autoLoginUser = async () => {
  try {
    const response = await api.get("/api/auth/auto-login");
    return {
      user: response.data.user,
      message: response.data.message,
      error: undefined,
      status: response.status,
    };
  } catch (error) {
    return {
      message: undefined,
      error: error,
    };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response;
  } catch (error) {
    throw new Error("Failed to logout");
  }
};
