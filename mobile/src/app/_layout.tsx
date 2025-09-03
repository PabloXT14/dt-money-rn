import { useState } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import "@/styles/global.css"

export default function RootLayout() {
  const [user, setUser] = useState(null)

  return (
    <>
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
    </>
  )
}
