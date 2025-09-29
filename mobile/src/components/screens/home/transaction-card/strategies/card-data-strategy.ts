import { TransactionType } from "@/shared/enums/transaction-type"

import type { TransactionCardType } from ".."

import { colors } from "@/shared/colors"

type CardDataType = {
  label: string
  bgColor: string
}

export const CARD_DATA: Record<TransactionCardType, CardDataType> = {
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
