import { useEffect } from "react"
import { FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ListHeader } from "@/components/screens/home/list-header"

import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"

export default function Home() {
  const { fetchCategories } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
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
    <SafeAreaView className="flex-1 bg-background-secondary">
      {/*  TRANSACTIONS LIST */}
      <FlatList
        data={[1, 2]}
        keyExtractor={(_, index) => String(index)}
        renderItem={() => <></>}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  )
}
