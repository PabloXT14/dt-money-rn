import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import "@/styles/global.css"

import { AuthContextProvider, useAuthContext } from "@/contexts/auth.context"

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AuthContextProvider>
  )
}

function RootNavigator() {
  const { user, token } = useAuthContext()

  const isAuthenticated = !!user && !!token

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
