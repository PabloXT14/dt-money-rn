import type { LoginFormData } from "@/components/screens/login/login-form"
import type { ILoginResponse } from "@/shared/interfaces/https/login-response"
import type { RegisterFormData } from "@/components/screens/register/register-form"
import type { IRegisterResponse } from "@/shared/interfaces/https/register-response"

import { dtMoneyApi } from "@/shared/api/dt-money"

export const login = async (
  userData: LoginFormData
): Promise<ILoginResponse> => {
  const { data } = await dtMoneyApi.post<ILoginResponse>(
    "/auth/login",
    userData
  )

  return data
}

export const register = async (
  userData: RegisterFormData
): Promise<IRegisterResponse> => {
  const { data } = await dtMoneyApi.post<IRegisterResponse>(
    "/auth/register",
    userData
  )

  return data
}
