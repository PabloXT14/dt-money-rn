import { useState } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import "@/styles/global.css"

import { AuthContextProvider } from "@/contexts/auth.context"

export default function RootLayout() {
  const [user, setUser] = useState(null)

  return (
    <AuthContextProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(private)" />
        </Stack.Protected>

        <Stack.Protected guard={!user}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </AuthContextProvider>
  )
}
