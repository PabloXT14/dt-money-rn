/* STRATEGY PATTERN */

import type { MaterialIcons } from "@expo/vector-icons"

import { TransactionType } from "@/shared/enums/transaction-type"

import { colors } from "@/shared/colors"

import type { TransactionCardType } from ".."

type IconsData = {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

export const ICONS: Record<TransactionCardType, IconsData> = {
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
