import type { LoginFormData } from "@/components/screens/login/login-form"
import type { ILoginResponse } from "@/shared/interfaces/https/login-response"

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
