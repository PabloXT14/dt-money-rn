import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"

import { useBottomSheetContext } from "@/contexts/bottomsheet.context"

import { colors } from "@/shared/colors"

export const NewTransactionForm = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    categoryId: 0,
    typedId: 0,
    description: "",
    value: 0,
  })

  return (
    <View className="p-6">
      {/* HEADER */}
      <View className="w-full flex-row items-center justify-between">
        <Text className="font-bold text-white text-xl">Nova transação</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={closeBottomSheet}>
          <MaterialIcons
            name="close"
            size={24}
            color={colors.gray[700]}
            onPress={closeBottomSheet}
          />
        </TouchableOpacity>
      </View>

      {/* FORM */}
    </View>
  )
}
