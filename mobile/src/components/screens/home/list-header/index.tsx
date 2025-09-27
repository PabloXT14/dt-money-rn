import { ScrollView, View } from "react-native"

import { Header } from "../header"
import { TransactionCard } from "../transaction-card"
import { TransactionType } from "@/shared/enums/transaction-type"

export const ListHeader = () => {
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
        >
          <TransactionCard type={TransactionType.INCOME} amount={1000} />

          <TransactionCard type={TransactionType.EXPENSE} amount={2000} />

          <TransactionCard type="total" amount={3000} />
        </ScrollView>
      </View>
    </>
  )
}
