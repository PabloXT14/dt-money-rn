import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

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

export const TransactionCard = ({ type, amount }: TransactionCardProps) => {
  const iconData = ICONS[type]

  return (
    <View>
      {/* HEADER */}
      <View>
        <Text>{type}</Text>

        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>

      {/* CONTENT */}
      <View>
        <Text>R${amount}</Text>
      </View>
    </View>
  )
}
