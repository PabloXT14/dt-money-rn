import { useEffect } from "react"
import { FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ListHeader } from "@/components/screens/home/list-header"
import { TransactionListCard } from "@/components/screens/home/transaction-list-card"

import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"

export default function Home() {
  const {
    transactions,
    isLoading,
    fetchCategories,
    fetchTransactions,
    refreshTransactions,
    loadMoreTransactions,
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      handleError(error, "Falha ao buscar categorias.")
    }
  }

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, "Falha ao buscar transações.")
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações.")
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions()
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações.")
    }
  }

  useEffect(() => {
    ;(async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ])
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
        contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        ListHeaderComponent={<ListHeader />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5} // Distance from the bottom to trigger the onEndReached event (0.5 = 50% of the screen)
      />
    </SafeAreaView>
  )
}
