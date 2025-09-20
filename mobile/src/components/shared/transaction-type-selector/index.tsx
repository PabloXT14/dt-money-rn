import { TouchableOpacity, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import clsx from "clsx"

import { colors } from "@/shared/colors"

import { TransactionType } from "@/shared/enums/transaction-type"

type TransactionTypeSelectorProps = {
  typeId?: number
  setTransactionType: (typeId: TransactionType) => void
}

export const TransactionTypeSelector = ({
  typeId,
  setTransactionType,
}: TransactionTypeSelectorProps) => {
  return (
    <View className="flex-row items-center gap-3">
      {/* INCOME */}
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.INCOME)}
        className={clsx(
          "h-[58px] flex-1 flex-row items-center justify-center gap-2 rounded-lg px-6",
          typeId === TransactionType.INCOME
            ? "bg-accent-brand-background-primary"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-up"
          size={24}
          color={
            typeId === TransactionType.INCOME
              ? colors.white
              : colors["accent-brand-light"]
          }
        />

        <Text className="text-base text-white">Entrada</Text>
      </TouchableOpacity>

      {/* EXPENSE */}
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.EXPENSE)}
        className={clsx(
          "h-[58px] flex-1 flex-row items-center justify-center gap-2 rounded-lg px-6",
          typeId === TransactionType.EXPENSE
            ? "bg-accent-red-background-primary"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          size={24}
          color={
            typeId === TransactionType.EXPENSE
              ? colors.white
              : colors["accent-red"]
          }
        />

        <Text className="text-base text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  )
}
