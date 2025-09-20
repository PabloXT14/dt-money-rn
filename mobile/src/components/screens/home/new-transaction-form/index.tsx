import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import CurrencyInput from "react-native-currency-input"

import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"

import { useBottomSheetContext } from "@/contexts/bottomsheet.context"

import { colors } from "@/shared/colors"

import { TransactionTypeSelector } from "@/components/shared/transaction-type-selector"

export const NewTransactionForm = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    categoryId: 0,
    typedId: 0,
    description: "",
    value: 0,
  })

  const setTransactionData = (
    key: keyof ICreateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevState) => ({ ...prevState, [key]: value }))
  }

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
      <View className="mt-6 gap-3">
        <BottomSheetTextInput
          placeholder="Descrição"
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
          className="h-14 w-full rounded-lg bg-background-primary px-4 text-base text-white"
          placeholderTextColor={colors.gray[700]}
        />

        <CurrencyInput
          // prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          value={transaction.value}
          onChangeValue={(text) => setTransactionData("value", Number(text))}
          placeholder="Preço"
          placeholderTextColor={colors.gray[700]}
          className="h-14 w-full rounded-lg bg-background-primary px-4 text-base text-white"
          renderTextInput={(props) => <BottomSheetTextInput {...props} />}
        />
      </View>

      {/* TYPE OPTIONS */}
      <View className="mt-6 w-full">
        <TransactionTypeSelector
          typeId={transaction.typedId}
          setTransactionType={(typeId) => setTransactionData("typedId", typeId)}
        />
      </View>
    </View>
  )
}
