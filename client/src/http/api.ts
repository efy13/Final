import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export const getAPi = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postApi = async (url: string, data: any) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteAPiWithParams = async (url: string, id: string) => {
  try {
    const response = await api.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const getAPiById = async (url: string, id: string) => {
  try {
    const response = await api.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    throw error;
  }
};

export const patchApi = async (url: string, id: string, data: any) => {
  try {
    const response = await api.patch(`${url}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchOrderApi = async (url: string, data: any) => {
  try {
    const response = await api.patch(`${url}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { api };
