import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import clsx from "clsx"

import { TransactionType } from "@/shared/enums/transaction-type"

import { colors } from "@/shared/colors"

type TransactionCardType = TransactionType | "total"

type TransactionCardProps = {
  type: TransactionCardType
  amount: number
}

/* STRATEGY PATTERN */

type IconsData = {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionType.INCOME]: {
    name: "arrow-circle-up",
    color: colors["accent-brand-light"],
  },
  [TransactionType.EXPENSE]: {
    name: "arrow-circle-down",
    color: colors["accent-red"],
  },
  total: {
    name: "attach-money",
    color: colors.white,
  },
}

type CardDataType = {
  label: string
  bgColor: string
}

const CARD_DATA: Record<TransactionCardType, CardDataType> = {
  [TransactionType.INCOME]: {
    label: "Entradas",
    bgColor: colors["background-tertiary"],
  },
  [TransactionType.EXPENSE]: {
    label: "Saídas",
    bgColor: colors["background-tertiary"],
  },
  total: {
    label: "Total",
    bgColor: colors["accent-brand-background-primary"],
  },
}

export const TransactionCard = ({ type, amount }: TransactionCardProps) => {
  const iconData = ICONS[type]
  const cardData = CARD_DATA[type]

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
      <View>
        <Text className="font-bold text-2xl text-gray-400">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  )
}
