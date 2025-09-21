import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const addTokenToRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await AsyncStorage.getItem("@dt-money:token")

      if (token) {
        if (!config.headers) {
          config.headers = {} as InternalAxiosRequestConfig["headers"]
        }

        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    }
  )
}
