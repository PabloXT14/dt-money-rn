import { View } from "react-native"

import { DismissKeyboardView } from "@/components/shared/dismiss-keyboard-view"
import { LoginForm } from "@/components/screens/login/login-form"
import { AuthHeader } from "@/components/shared/auth-header"

import { useAuthContext } from "@/contexts/auth.context"

export default function Login() {
  const { user } = useAuthContext()

  // biome-ignore lint/suspicious/noConsole: debugging
  console.log({ user })

  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  )
}
