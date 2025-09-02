import { Stack } from "expo-router"

import "@/styles/global.css"

const isLoggedIn = false

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  )
}
