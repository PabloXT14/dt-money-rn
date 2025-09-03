import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

import { DismissKeyboardView } from "@/components/shared/dismiss-keyboard-view"

export default function Login() {
  return (
    <DismissKeyboardView>
      <Text className="mb-8 font-roboto text-lg text-white">Login Screen</Text>

      <View className="mb-8 w-full gap-2">
        <Text className="font-roboto font-semibold text-white">Email</Text>
        <TextInput className="rounded-md border border-gray-700 bg-zinc-800" />
      </View>

      <View className="mb-8 w-full gap-2">
        <Text className="font-roboto font-semibold text-white">Senha</Text>
        <TextInput className="rounded-md border border-gray-600 bg-zinc-800" />
      </View>

      <TouchableOpacity className="mb-8 h-14 w-full items-center justify-center rounded-md bg-emerald-500 p-4">
        <Text className="font-bold font-roboto text-base text-white">
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className=""
        onPress={() => router.navigate("/register")}
      >
        <Text className="font-roboto text-sm text-white underline">
          Criar conta
        </Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  )
}
