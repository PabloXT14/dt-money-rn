import { ScrollView, View } from "react-native"

import { Header } from "../header"
import { TransactionCard } from "../transaction-card"

import { TransactionType } from "@/shared/enums/transaction-type"

import { useTransactionContext } from "@/contexts/transaction.context"

export const ListHeader = () => {
  const { totalTransactions } = useTransactionContext()

  return (
    <>
      <Header />

      {/* SUMMARY CARDS */}
      <View className="h-[150px] w-full">
        <View className="h-[50px] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141px] pl-8"
          contentContainerClassName="gap-4 pr-16"
        >
          <TransactionCard
            type={TransactionType.INCOME}
            amount={totalTransactions.revenue}
          />

          <TransactionCard
            type={TransactionType.EXPENSE}
            amount={totalTransactions.expense}
          />

          <TransactionCard type="total" amount={totalTransactions.total} />
        </ScrollView>
      </View>
    </>
  )
}
