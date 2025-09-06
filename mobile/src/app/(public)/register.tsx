import { View } from "react-native"

import { DismissKeyboardView } from "@/components/shared/dismiss-keyboard-view"
import { AuthHeader } from "@/components/shared/auth-header"
import { RegisterForm } from "@/components/screens/register/register-form"

export default function Register() {
  return (
    <DismissKeyboardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  )
}
