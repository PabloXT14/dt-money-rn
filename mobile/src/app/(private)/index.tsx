import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/screens/home/header"

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
    <SafeAreaView className="flex-1 bg-background-primary">
      <Header />
    </SafeAreaView>
  )
}
