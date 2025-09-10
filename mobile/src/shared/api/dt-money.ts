import axios from "axios"
import { Platform } from "react-native"

const BASE_URL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://192.168.2.123:3001",
})

export const dtMoneyApi = axios.create({
  baseURL: BASE_URL,
})
