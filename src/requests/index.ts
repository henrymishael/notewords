import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import axios, { AxiosError, AxiosHeaders } from "axios";
import { toast } from "sonner";
import nookies from "nookies";
import { _storageKeys, onHandleSignout } from "@/lib/utils";

const apiService = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASEURL!;

  const axiosService = axios.create({
    baseURL: `${baseURL}/api/`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": baseURL,
    },
  });

  axiosService.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const cookies = nookies.get(null);
      const token = cookies[_storageKeys.token];

      if (!token) return config;
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);

      return config;
    }
  );

  axiosService.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error?.response === undefined)
        toast.error("Unable to connect to internet");
      else {
        const errorData = error?.response?.data as Record<
          string,
          string | object
        >;

        const errorMessage = (errorData?.message ||
          errorData.error ||
          "Something went wrong") as string;

        if (errorMessage) {
          toast.error(errorMessage);
        }

        if (
          ["we could not authenticate your request"].includes(
            errorMessage?.toLowerCase()
          )
        ) {
          onHandleSignout();
        }

        return Promise.reject(errorData);
      }
    }
  );

  interface IPostProps {
    url: string;
    payload?: object | FormData;
    isFormData?: boolean;
  }

  return {
    get: async (url: string) => {
      try {
        const data = axiosService.get(url);
        const resolvedData = await Promise.resolve(data);
        return resolvedData?.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    post: async ({ url, payload, isFormData = false }: IPostProps) => {
      try {
        // Automatic detection of FormData
        const isPayloadFormData = payload instanceof FormData;
        const config =
          isFormData || isPayloadFormData
            ? {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            : {};

        const data = axiosService.post(url, payload, config);
        const resolvedData = await Promise.resolve(data);
        return resolvedData?.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    patch: async ({ url, payload, isFormData = false }: IPostProps) => {
      try {
        const isPayloadFormData = payload instanceof FormData;
        const config =
          isFormData || isPayloadFormData
            ? {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            : {};

        const data = axiosService.patch(url, payload, config);
        const resolvedData = await Promise.resolve(data);
        return resolvedData?.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    delete: async ({ url, payload, isFormData = false }: IPostProps) => {
      try {
        // Added automatic FormData detection for consistency
        const isPayloadFormData = payload instanceof FormData;
        const config =
          isFormData || isPayloadFormData
            ? {
                data: payload,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            : { data: payload };

        const data = axiosService.delete(url, config);
        const resolvedData = await Promise.resolve(data);
        return resolvedData?.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    put: async ({ url, payload, isFormData = false }: IPostProps) => {
      try {
        const isPayloadFormData = payload instanceof FormData;
        const config =
          isFormData || isPayloadFormData
            ? {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            : {};

        const data = axiosService.put(url, payload, config);
        const resolvedData = await Promise.resolve(data);
        return resolvedData?.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};

export const _axios = apiService();
