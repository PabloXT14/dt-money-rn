import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import clsx from "clsx"
import { format } from "date-fns"

import type { TransactionType } from "@/shared/enums/transaction-type"

import { useTransactionContext } from "@/contexts/transaction.context"

import { ICONS } from "./strategies/icon-strategy"
import { CARD_DATA } from "./strategies/card-data-strategy"

import { moneyMapper } from "@/shared/utils/money-mapper"

export type TransactionCardType = TransactionType | "total"

type TransactionCardProps = {
  type: TransactionCardType
  amount: number
}

export const TransactionCard = ({ type, amount }: TransactionCardProps) => {
  const iconData = ICONS[type]
  const cardData = CARD_DATA[type]

  const { transactions, filters } = useTransactionContext()

  // OBS: as transações vêm do back-end do mais recente para o mais antigo, sendo assim o primeiro item do array é o mais recente, e em nosso caso checamos também se o type dele é igual ao type do card, e se for então ele é o mais recente daquele tipo
  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  )

  const dateInfo = () => {
    if (type === "total") {
      return filters.from && filters.to
        ? `${format(filters.from, "d MMMM")} até ${format(filters.to, "d MMMM")}`
        : "Todo o período"
    }

    return lastTransaction?.createdAt
      ? format(
          lastTransaction.createdAt,
          `'Última ${cardData.label.toLocaleLowerCase().slice(0, -1)} em' d 'de' MMMM'`
        )
      : "Nenhuma transação encontrada"
  }

  return (
    <View
      className={clsx("min-w-[280px] justify-between rounded-md px-8 py-6")}
      style={{ backgroundColor: cardData.bgColor }}
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>

        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>

      {/* CONTENT */}
      <View className="gap-1">
        <Text className="font-bold text-2xl text-gray-400">
          {/* R$ {amount.toFixed(2).replace(".", ",")} */}
          {moneyMapper(amount)}
        </Text>

        {/* {type !== "total" && (
          <Text className="text-gray-700 text-sm" numberOfLines={1}>
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase().slice(0, -1)} em' d 'de' MMMM'`
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )} */}

        <Text
          className={clsx(
            "text-sm",
            type === "total" ? "text-white" : "text-gray-700"
          )}
        >
          {dateInfo()}
        </Text>
      </View>
    </View>
  )
}
