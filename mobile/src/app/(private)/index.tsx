import { useEffect } from "react"
import { ActivityIndicator, FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ListHeader } from "@/components/screens/home/list-header"
import { TransactionListCard } from "@/components/screens/home/transaction-list-card"
import { EmptyList } from "@/components/shared/empty-list"

import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"

import { colors } from "@/shared/colors"

export default function Home() {
  const {
    transactions,
    loadings,
    pagination,
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

      // await new Promise((resolve) => setTimeout(resolve, 2000)) // para simular um delay no carregamento de novas transações

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
          flexGrow: 1,
          gap: 16,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeader />}
        onEndReachedThreshold={0.2} // Distance from the bottom to trigger the onEndReached event (0.2 = 20% of the screen)
        onEndReached={() => {
          if (loadings.loadMore || pagination.page >= pagination.totalPages) {
            return
          }

          handleLoadMoreTransactions()
        }}
        ListFooterComponent={() =>
          loadings.loadMore ? (
            <ActivityIndicator color={colors["accent-brand-light"]} />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
        ListEmptyComponent={() =>
          loadings.initial ? null : (
            <EmptyList message="Nenhuma transação encontrada." />
          )
        }
      />
    </SafeAreaView>
  )
}
