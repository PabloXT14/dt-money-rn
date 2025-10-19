import { Text, TouchableOpacity, View } from "react-native"
import Checkbox from "expo-checkbox"

import { TransactionType } from "@/shared/enums/transaction-type"

import { colors } from "@/shared/colors"
import { useTransactionContext } from "@/contexts/transaction.context"

export const TypeFilter = () => {
  const { filters, handleFilters } = useTransactionContext()

  const handleSelectType = (typeId: TransactionType) => {
    handleFilters({ key: "typeId", value: typeId })
  }

  return (
    <View className="gap-2">
      <Text className="font-bold text-gray-700 text-sm">Tipo</Text>

      {/* TYPE FILTERS */}
      <View>
        <TouchableOpacity
          className="flex-row items-center gap-2 py-2"
          onPress={() => handleSelectType(TransactionType.INCOME)}
        >
          <Checkbox
            value={filters.typeId === TransactionType.INCOME}
            onValueChange={() => handleSelectType(TransactionType.INCOME)}
            color={
              filters.typeId === TransactionType.INCOME
                ? colors["accent-brand"]
                : colors.gray[800]
            }
            style={{
              borderRadius: 4,
              borderWidth: 1,
            }}
          />
          <Text className="text-base text-white">Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectType(TransactionType.EXPENSE)}
          className="flex-row items-center gap-2 py-2"
        >
          <Checkbox
            value={filters.typeId === TransactionType.EXPENSE}
            onValueChange={() => handleSelectType(TransactionType.EXPENSE)}
            color={
              filters.typeId === TransactionType.EXPENSE
                ? colors["accent-brand"]
                : colors.gray[800]
            }
            style={{
              borderRadius: 4,
              borderWidth: 1,
            }}
          />
          <Text className="text-base text-white">Saída</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
