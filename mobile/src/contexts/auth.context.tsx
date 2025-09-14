import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

import type { LoginFormData } from "@/components/screens/login/login-form"
import type { RegisterFormData } from "@/components/screens/register/register-form"
import type { IUser } from "@/shared/interfaces/user-interface"
import type { RestoreSessionResponse } from "@/shared/interfaces/restore-session"

// biome-ignore lint/performance/noNamespaceImport: disabled for clarity
import * as authService from "@/shared/services/dt-money/auth.service"

type AuthContextType = {
  user: IUser | null
  token: string | null
  handleLogin: (params: LoginFormData) => Promise<void>
  handleRegister: (params: RegisterFormData) => Promise<void>
  handleLogout: () => void
  restoreUserSession: () => Promise<RestoreSessionResponse>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // biome-ignore lint/nursery/noShadow: disabled for clarity
  const setTokenStorage = async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem("@dt-money:token", token)
    } else {
      await AsyncStorage.removeItem("@dt-money:token")
    }

    setToken(token)
  }

  // biome-ignore lint/nursery/noShadow: disabled for clarity
  const setUserStorage = async (user: IUser | null) => {
    if (user) {
      await AsyncStorage.setItem("@dt-money:user", JSON.stringify(user))
    } else {
      await AsyncStorage.removeItem("@dt-money:user")
    }

    setUser(user)
  }

  const handleLogin = async (params: LoginFormData) => {
    // biome-ignore lint/nursery/noShadow: disabled for clarity
    const { user, token } = await authService.login(params)

    await setUserStorage(user)
    await setTokenStorage(token)

    setUser(user)
    setToken(token)
  }

  const handleRegister = async (params: RegisterFormData) => {
    // biome-ignore lint/nursery/noShadow: disabled for clarity
    const { user, token } = await authService.register(params)

    await setUserStorage(user)
    await setTokenStorage(token)

    setUser(user)
    setToken(token)
  }

  const handleLogout = async () => {
    await AsyncStorage.clear()

    setUser(null)
    setToken(null)
  }

  const restoreUserSession = async () => {
    const storedUser = await AsyncStorage.getItem("@dt-money:user")
    const storedToken = await AsyncStorage.getItem("@dt-money:token")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)

      return {
        user: JSON.parse(storedUser),
        token: storedToken,
      }
    }

    return {
      user: null,
      token: null,
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleLogin,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  return context
}
