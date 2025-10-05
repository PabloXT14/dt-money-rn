import { useEffect } from "react"
import { FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ListHeader } from "@/components/screens/home/list-header"

import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"
import { TransactionListCard } from "@/components/screens/home/transaction-list-card"

export default function Home() {
  const { transactions, fetchCategories, fetchTransactions, refreshTransactions, isLoading } =
    useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await Promise.all([fetchCategories(), fetchTransactions()])
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await handleFetchCategories()
    })()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      {/*  TRANSACTIONS LIST */}
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={(transaction) => `transaction-${transaction.id}`}
        renderItem={({ item }) => (
          <TransactionListCard transactionData={item} />
        )}
        contentContainerStyle={{ gap: 16 }}
        ListHeaderComponent={<ListHeader />}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshTransactions} />}
      />
    </SafeAreaView>
  )
}
