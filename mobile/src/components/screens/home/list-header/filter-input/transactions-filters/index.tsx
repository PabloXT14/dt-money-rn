import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { useBottomSheetContext } from "@/contexts/bottomsheet.context"
import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"

import { colors } from "@/shared/colors"

import { DateFilter } from "./date-filter"
import { CategoryFilter } from "./category-filter"
import { TypeFilter } from "./type-filter"
import { Button } from "@/components/shared/button"

export const TransactionsFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { fetchTransactions, handleLoadings, resetFilters } =
    useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleApplyFilters = async () => {
    try {
      handleLoadings({ key: "refresh", value: true })

      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, "Falha aplicar os filtros.")
    } finally {
      handleLoadings({ key: "refresh", value: false })
      closeBottomSheet()
    }
  }

  const handleResetFilters = async () => {
    try {
      handleLoadings({ key: "refresh", value: true })

      await resetFilters()
    } catch (error) {
      handleError(error, "Falha ao limpar os filtros.")
    } finally {
      handleLoadings({ key: "refresh", value: false })
      closeBottomSheet()
    }
  }

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
      <View className="mb-12 gap-6">
        {/* DATE */}
        <DateFilter />

        {/* CATEGORY */}
        <CategoryFilter />

        {/* TYPE */}
        <TypeFilter />
      </View>

      {/* ACTIONS */}
      <View className="w-full flex-row gap-4">
        <Button
          mode="outline"
          className="flex-1"
          widthFull={false}
          onPress={handleResetFilters}
        >
          Limpar filtros
        </Button>

        <Button
          onPress={handleApplyFilters}
          className="flex-1"
          widthFull={false}
        >
          Filtrar
        </Button>
      </View>
    </View>
  )
}
