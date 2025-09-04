import { View } from "react-native"
import { useForm } from "react-hook-form"

import { Input } from "@/components/shared/input"

export type LoginFormData = {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>()

  return (
    <View>
      <Input
        control={control}
        name="email"
        label="EMAIL"
        leftIconName="mail-outline"
        placeholder="Digite seu email"
      />

      <Input
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Digite sua senha"
        secureTextEntry
      />
    </View>
  )
}
