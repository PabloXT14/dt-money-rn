import { Text, View } from "react-native"
import { useForm } from "react-hook-form"

import { Input } from "@/components/shared/input"
import { Button } from "@/components/shared/button"

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

      <View className="mt-8 mb-6 min-h-[250px] flex-1 justify-between">
        <Button iconName="arrow-forward" onPress={handleSubmit(() => {})}>
          Logar
        </Button>

        <View className="gap-6">
          <Text className="text-base text-gray-300">
            Ainda não tem uma conta?
          </Text>

          <Button iconName="arrow-forward" mode="outline">
            Cadastrar
          </Button>
        </View>
      </View>
    </View>
  )
}
