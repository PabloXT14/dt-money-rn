import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react"

import type { LoginFormData } from "@/components/screens/login/login-form"
import type { RegisterFormData } from "@/components/screens/register/register-form"
import type { IUser } from "@/shared/interfaces/user-interface"

// biome-ignore lint/performance/noNamespaceImport: disabled for clarity
import * as authService from "@/shared/services/dt-money/auth.service"

type AuthContextType = {
  user: IUser | null
  token: string | null
  handleLogin: (params: LoginFormData) => Promise<void>
  handleRegister: (params: RegisterFormData) => Promise<void>
  handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const handleLogin = async (params: LoginFormData) => {
    // biome-ignore lint/nursery/noShadow: disabled for clarity
    const { user, token } = await authService.login(params)

    setUser(user)
    setToken(token)
  }

  const handleRegister = async (params: RegisterFormData) => {
    // biome-ignore lint/nursery/noShadow: disabled for clarity
    const { user, token } = await authService.register(params)

    setUser(user)
    setToken(token)
  }

  const handleLogout = () => {}

  return (
    <AuthContext.Provider
      value={{ user, token, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  return context
}
