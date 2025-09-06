import { Text, View } from "react-native"
import { useForm } from "react-hook-form"

import { Input } from "@/components/shared/input"
import { Button } from "@/components/shared/button"
import { router } from "expo-router"

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>()

  return (
    <>
      <Input
        control={control}
        name="name"
        label="NOME"
        leftIconName="person-outline"
        placeholder="Seu nome completo"
      />

      <Input
        control={control}
        name="email"
        label="EMAIL"
        leftIconName="mail-outline"
        placeholder="mail@exemplo.com"
      />

      <Input
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />

      <Input
        control={control}
        name="confirmPassword"
        label="CONFIRMAR SENHA"
        leftIconName="lock-outline"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="mt-8 mb-6 min-h-[250px] flex-1 justify-between">
        <Button iconName="arrow-forward" onPress={handleSubmit(() => {})}>
          Cadastrar
        </Button>

        <View className="gap-6">
          <Text className="text-base text-gray-300">Já tem uma conta?</Text>

          <Button
            iconName="arrow-forward"
            mode="outline"
            onPress={() => router.back()}
          >
            Acessar
          </Button>
        </View>
      </View>
    </>
  )
}
