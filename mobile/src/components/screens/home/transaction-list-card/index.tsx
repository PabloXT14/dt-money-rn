import { Text, View } from "react-native"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import { MaterialIcons } from "@expo/vector-icons"
import { format } from "date-fns"
import clsx from "clsx"

import type { Transaction } from "@/shared/interfaces/transaction"
import { TransactionType } from "@/shared/enums/transaction-type"

import { colors } from "@/shared/colors"

import { RightAction } from "./right-action"

type TransactionListCardProps = {
  transactionData: Transaction
}

export const TransactionListCard = ({
  transactionData,
}: TransactionListCardProps) => {
  const isExpense = transactionData.type.id === TransactionType.EXPENSE

  return (
    <Swipeable
      containerStyle={{
        alignItems: "center",
        alignSelf: "center",
        overflow: "visible",
        width: "90%",
      }}
      renderRightActions={() => <RightAction />}
      overshootRight={false}
      // overshootLeft={false}
    >
      <View className="h-[140px] w-full justify-between rounded-md bg-background-tertiary p-6">
        {/* CONTENT */}
        <View className="gap-2">
          <Text className="text-base text-white" numberOfLines={1}>
            {transactionData.description}
          </Text>

          <Text
            className={clsx(
              "font-bold text-xl",
              !isExpense && "text-accent-brand-light",
              isExpense && "text-accent-red"
            )}
          >
            {isExpense && "-"} R${" "}
            {transactionData.value.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        {/* FOOTER */}
        <View className="w-full flex-row items-center justify-between">
          {/* CATEGORY */}
          <View className="flex-row items-center gap-2">
            <MaterialIcons
              name="label-outline"
              size={23}
              color={colors.gray[700]}
            />

            <Text className="text-base text-gray-700">
              {transactionData.category.name}
            </Text>
          </View>

          {/* DATE */}
          <View className="flex-row items-center gap-2">
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={colors.gray[700]}
            />

            <Text className="text-base text-gray-700">
              {format(transactionData.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}
