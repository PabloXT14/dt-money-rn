import { Image, TouchableOpacity, View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/shared/colors"

import { useAuthContext } from "@/contexts/auth.context"
import { useBottomSheetContext } from "@/contexts/bottomsheet.context"

export const Header = () => {
  const { handleLogout } = useAuthContext()
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <View className="w-full flex-row items-center justify-between gap-2 p-8">
      <View className="flex-1 gap-2">
        <Image
          source={require("@/assets/logo.png")}
          alt="Logo"
          className="h-[30px] w-[130px]"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          className="flex-row items-center gap-1"
        >
          <MaterialIcons name="logout" size={16} color={colors.gray[700]} />
          <Text className="text-gray-700 text-xs">Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          openBottomSheet(
            <View className="flex-1 p-4">
              <Text className="font-bold text-lg text-white">
                Formulário de nova transação
              </Text>
            </View>,
            0
          )
        }}
        className="h-[40px] w-[140px] items-center justify-center rounded-md bg-accent-brand"
      >
        <Text className="font-bold text-sm text-white">Nova transação</Text>
      </TouchableOpacity>
    </View>
  )
}
