import axios from "axios"
import { Platform } from "react-native"

import { AppError } from "../helpers/app-error"
import { addTokenToRequest } from "../helpers/axios.helper"

const BASE_URL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://192.168.2.123:3001",
})

export const dtMoneyApi = axios.create({
  baseURL: BASE_URL,
})

addTokenToRequest(dtMoneyApi)

dtMoneyApi.interceptors.response.use(
  (response) => {
    // qualquer resposta que vier do backend, se for 2xx cai aqui
    return response
  },
  (error) => {
    // qualquer resposta que vier do backend, se for diferente de 2xx cai aqui
    if (error.response?.data?.message) {
      return Promise.reject(new AppError(error.response.data.message))
    }

    return Promise.reject(new AppError("Falha na requisição ao servidor."))
  }
)
