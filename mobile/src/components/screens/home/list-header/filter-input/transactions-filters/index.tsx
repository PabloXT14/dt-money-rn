import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { useBottomSheetContext } from "@/contexts/bottomsheet.context"

import { colors } from "@/shared/colors"

import { DateFilter } from "./date-filter"

export const TransactionsFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  return (
    <View className="flex-1 p-6">
      {/* HEADER */}
      <View className="mb-6 w-full flex-row items-center justify-between">
        <Text className="font-bold text-white text-xl">Filtrar transações</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={closeBottomSheet}>
          <MaterialIcons
            name="close"
            size={24}
            color={colors.gray[700]}
            onPress={closeBottomSheet}
          />
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View className="mb-16 gap-6">
        {/* DATE */}
        <DateFilter />

        {/* CATEGORY */}
        <View />

        {/* TYPE */}
        <View />
      </View>

      {/* ACTIONS */}
      <View className="w-full flex-row gap-3">
        <TouchableOpacity
          className="h-[40px] flex-1 items-center justify-center rounded-lg border border-accent-brand bg-transparent"
          activeOpacity={0.8}
        >
          <Text className="font-medium text-accent-brand text-sm">
            Limpar filtros
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-[40px] flex-1 items-center justify-center rounded-lg bg-accent-brand"
          activeOpacity={0.8}
        >
          <Text className="font-medium text-sm text-white">Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
