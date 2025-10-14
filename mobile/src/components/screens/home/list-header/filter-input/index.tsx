import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { useTransactionContext } from "@/contexts/transaction.context"

import { colors } from "@/shared/colors"

export const FilterInput = () => {
  const { pagination } = useTransactionContext()

  return (
    <View className="mt-8 px-8">
      {/* TITLE */}
      <View className="mb-3 w-full flex-row items-center justify-between">
        <Text className="font-bold text-lg text-white">Transações</Text>

        <Text className="text-base text-gray-700">
          {pagination.totalRows} {pagination.totalRows === 1 ? "item" : "itens"}
        </Text>
      </View>

      {/* INPUT */}
      <View className="h-16 flex-row items-center justify-between gap-2 bg-background-primary pr-4">
        <TextInput
          className="h-[50px] flex-1 pl-4 text-base text-white"
          placeholderTextColor={colors.gray[700]}
          placeholder="Busque uma transação"
        />

        <TouchableOpacity className="" activeOpacity={0.8}>
          <MaterialIcons
            name="filter-list"
            size={24}
            color={colors["accent-brand-light"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
