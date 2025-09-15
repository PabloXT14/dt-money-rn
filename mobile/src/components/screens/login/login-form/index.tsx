import { Alert, Text, View } from "react-native"
import { router } from "expo-router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/shared/input"
import { Button } from "@/components/shared/button"

import { useAuthContext } from "@/contexts/auth.context"

import { AppError } from "@/shared/helpers/app-error"

const MIN_PASSWORD_LENGTH = 6

const LoginFormSchema = z.object({
  email: z
    .email({ error: "Email inválido" })
    .nonempty({ error: "O email é obrigatório" }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      error: "A senha deve ter no mínimo 6 caracteres",
    })
    .nonempty({ error: "A senha é obrigatória" }),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  const { handleLogin } = useAuthContext()

  const onSubmit = async (data: LoginFormData) => {
    try {
      await handleLogin(data)
    } catch (error) {
      if (error instanceof AppError) {
        // biome-ignore lint/suspicious/noConsole: debugging
        console.log(error.message)
      }

      Alert.alert(
        "Erro",
        "Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente."
      )
    }
  }

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
        <Button iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          Logar
        </Button>

        <View className="gap-6">
          <Text className="text-base text-gray-300">
            Ainda não tem uma conta?
          </Text>

          <Button
            iconName="arrow-forward"
            mode="outline"
            onPress={() => router.navigate("register")}
          >
            Cadastrar
          </Button>
        </View>
      </View>
    </View>
  )
}
