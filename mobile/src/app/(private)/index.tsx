import { Text, View } from "react-native"

import { Button } from "@/components/shared/button"

import { useAuthContext } from "@/contexts/auth.context"

export default function Home() {
  const { handleLogout } = useAuthContext()

  return (
    <View className="flex-1 items-center justify-center bg-background-primary p-6">
      <Text className="mb-4 font-roboto text-lg text-white">Home Screen</Text>

      <Button iconName="logout" onPress={handleLogout}>
        Sair
      </Button>
    </View>
  )
}
