import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react"

import type { LoginFormData } from "@/components/screens/login/login-form"
import type { RegisterFormData } from "@/components/screens/register/register-form"

type AuthContextType = {
  user: null
  token: string | null
  handleLogin: (params: LoginFormData) => Promise<void>
  handleRegister: (params: RegisterFormData) => Promise<void>
  handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState<string | null>(null)

  const handleLogin = async (params: LoginFormData) => {}

  const handleRegister = async (params: RegisterFormData) => {}

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
