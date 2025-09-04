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
        label="Email"
        placeholder="Digite seu email"
      />
    </View>
  )
}
