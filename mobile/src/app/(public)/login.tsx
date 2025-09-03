import { Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <Text className="font-roboto text-lg text-white">Login Screen</Text>

      <TouchableOpacity
        className="mt-4 rounded bg-blue-500 p-2"
        onPress={() => router.navigate("/register")}
      >
        <Text className="font-roboto text-lg text-white">Go to Register</Text>
      </TouchableOpacity>
    </View>
  )
}
