import { useEffect, useState } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import "@/styles/global.css"

import { AuthContextProvider, useAuthContext } from "@/contexts/auth.context"
import { BottomSheetContextProvider } from "@/contexts/bottomsheet.context"

import { Loading } from "@/components/shared/loading"
import { SnackbarContextProvider } from "@/contexts/snackbar.context"
import { Snackbar } from "@/components/shared/snackbar"

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SnackbarContextProvider>
        <AuthContextProvider>
          <BottomSheetContextProvider>
            <StatusBar style="light" />
            <RootNavigator />
            <Snackbar />
          </BottomSheetContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  )
}

function RootNavigator() {
  const [loading, setLoading] = useState(true)
  const { user, token, restoreUserSession, handleLogout } = useAuthContext()

  const isAuthenticated = !!user && !!token

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { user: restoredUser, token: restoredToken } =
          await restoreUserSession()

        if (!(restoredUser || restoredToken)) {
          await handleLogout()
        }
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: debugging
        console.log(error)

        await handleLogout()
      } finally {
        setLoading(false)
      }
    }

    checkUserSession()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(private)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  )
}
