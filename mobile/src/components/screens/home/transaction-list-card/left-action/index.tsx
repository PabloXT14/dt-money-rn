import { View } from "react-native"
import { Pressable } from "react-native-gesture-handler"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/shared/colors"
import { useBottomSheetContext } from "@/contexts/bottomsheet.context"

type LeftActionProps = {
  transactionId: number
}

// Obs: estamos usando o Pressable pois o renderLeftActions do Swipeable no atual momento (10/2025) não está funciona bem com o TouchableOpacity

export const LeftAction = ({ transactionId }: LeftActionProps) => {
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <Pressable
      onPress={() => {
        openBottomSheet(<View />, 1)
      }}
    >
      <View className="h-[140px] w-[80px] items-center justify-center rounded-l-md bg-accent-blue-dark">
        <MaterialIcons name="edit" size={24} color={colors.white} />
      </View>
    </Pressable>
  )
}
