import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

// biome-ignore lint/performance/noNamespaceImport: for convenience
import * as transactionService from "@/shared/services/dt-money/transaction.service"

import { colors } from "@/shared/colors"

import { DeleteModal } from "./delete-modal"

import { useSnackbarContext } from "@/contexts/snackbar.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"
import { useTransactionContext } from "@/contexts/transaction.context"

type RightActionProps = {
  transactionId: number
}

export const RightAction = ({ transactionId }: RightActionProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const { notify } = useSnackbarContext()
  const { handleError } = useErrorHandler()
  const { refreshTransactions } = useTransactionContext()

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true)

      await transactionService.deleteTransaction(transactionId)

      notify({
        message: "Transação deletada com sucesso!",
        messageType: "SUCCESS",
      })
      hideModal()

      await refreshTransactions()
    } catch (error) {
      handleError(error, "Falha ao deletar transação.")
    } finally {
      setLoading(false)
    }
  }

  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-[140px] w-[80px] items-center justify-center rounded-r-md bg-accent-red-background-primary"
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" size={24} color={colors.white} />
      </TouchableOpacity>

      <DeleteModal
        visible={modalVisible}
        onHideModal={hideModal}
        onDelete={handleDeleteTransaction}
        loading={loading}
      />
    </>
  )
}
