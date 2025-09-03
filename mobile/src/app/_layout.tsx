import { useState } from "react"
import { Stack } from "expo-router"

import "@/styles/global.css"

export default function RootLayout() {
  const [user, setUser] = useState({
    id: "1",
    email: "user@example.com",
    name: "John Doe",
  })

  return (
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
  )
}
