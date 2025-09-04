import { Text, View } from "react-native"
import { useForm } from "react-hook-form"

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
      <Text className="font-bold text-white text-xl">Login Form</Text>
    </View>
  )
}
