import { useEffect } from "react"
import { FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ListHeader } from "@/components/screens/home/list-header"
import { TransactionListCard } from "@/components/screens/home/transaction-list-card"

import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"
import { EmptyList } from "@/components/shared/empty-list"

export default function Home() {
  const {
    transactions,
    loadings,
    fetchCategories,
    fetchTransactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      handleLoadings({ key: "initial", value: true })

      await fetchCategories()
    } catch (error) {
      handleError(error, "Falha ao buscar categorias.")
    } finally {
      handleLoadings({ key: "initial", value: false })
    }
  }

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({ key: "initial", value: true })

      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, "Falha ao buscar transações.")
    } finally {
      handleLoadings({ key: "initial", value: false })
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({ key: "loadMore", value: true })

      await loadMoreTransactions()
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações.")
    } finally {
      handleLoadings({ key: "loadMore", value: false })
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true })

      await refreshTransactions()
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações.")
    } finally {
      handleLoadings({ key: "refresh", value: false })
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
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 32,
        }}
        ListHeaderComponent={<ListHeader />}
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5} // Distance from the bottom to trigger the onEndReached event (0.5 = 50% of the screen)
        ListEmptyComponent={
          loadings.initial ? null : (
            <EmptyList message="Nenhuma transação encontrada." />
          )
        }
      />
    </SafeAreaView>
  )
}
