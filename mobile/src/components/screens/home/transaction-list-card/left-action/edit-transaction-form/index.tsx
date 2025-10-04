import { useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import CurrencyInput from "react-native-currency-input"
import { ZodError } from "zod"

import { useBottomSheetContext } from "@/contexts/bottomsheet.context"
import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"
import { useSnackbarContext } from "@/contexts/snackbar.context"

import { colors } from "@/shared/colors"

import type { IUpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request"
import type { Transaction } from "@/shared/interfaces/transaction"

import { ErrorMessage } from "@/components/shared/error-message"
import { SelectCategoryModal } from "@/components/shared/select-category-modal"
import { TransactionTypeSelector } from "@/components/shared/transaction-type-selector"
import { Button } from "@/components/shared/button"

import { editTransactionFormSchema } from "./schema"

type ValidationErrorsType = Record<keyof IUpdateTransactionRequest, string>

type EditTransactionFormProps = {
  transactionToUpdate: Transaction
}

export const EditTransactionForm = ({
  transactionToUpdate,
}: EditTransactionFormProps) => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { updateTransaction } = useTransactionContext()
  const { handleError } = useErrorHandler()
  const { notify } = useSnackbarContext()

  const [transaction, setTransaction] = useState<IUpdateTransactionRequest>({
    id: transactionToUpdate.id,
    categoryId: transactionToUpdate.categoryId,
    typeId: transactionToUpdate.typeId,
    description: transactionToUpdate.description,
    value: transactionToUpdate.value,
  })
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>()
  const [loading, setLoading] = useState(false)

  const setTransactionData = (
    key: keyof IUpdateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevState) => ({ ...prevState, [key]: value }))
  }

  const handleUpdateTransaction = async () => {
    try {
      setLoading(true)

      editTransactionFormSchema.parse(transaction)

      await updateTransaction(transaction)

      notify({
        message: "Transação atualizada com sucesso!",
        messageType: "SUCCESS",
      })

      closeBottomSheet()
    } catch (error) {
      if (error instanceof ZodError) {
        // biome-ignore lint/suspicious/noConsole: debug
        console.log(error)

        const errors = {} as ValidationErrorsType

        for (const issue of error.issues) {
          errors[issue.path[0] as keyof IUpdateTransactionRequest] =
            issue.message
        }

        setValidationErrors(errors)
      } else {
        handleError(error, "Falha ao atualizar transação.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="p-6">
      {/* HEADER */}
      <View className="w-full flex-row items-center justify-between">
        <Text className="font-bold text-white text-xl">Editar transação</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={closeBottomSheet}>
          <MaterialIcons
            name="close"
            size={24}
            color={colors.gray[700]}
            onPress={closeBottomSheet}
          />
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View className="mt-6 gap-3">
        <View>
          <BottomSheetTextInput
            placeholder="Descrição"
            value={transaction.description}
            onChangeText={(text) => setTransactionData("description", text)}
            className="h-14 w-full rounded-lg bg-background-primary px-4 text-base text-white"
            placeholderTextColor={colors.gray[700]}
          />

          {validationErrors?.description && (
            <ErrorMessage>{validationErrors.description}</ErrorMessage>
          )}
        </View>

        <View>
          <CurrencyInput
            // prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            value={transaction.value}
            onChangeValue={(text) => setTransactionData("value", Number(text))}
            placeholder="Preço"
            placeholderTextColor={colors.gray[700]}
            className="h-14 w-full rounded-lg bg-background-primary px-4 text-base text-white"
            renderTextInput={(props) => <BottomSheetTextInput {...props} />}
          />

          {validationErrors?.value && (
            <ErrorMessage>{validationErrors.value}</ErrorMessage>
          )}
        </View>

        <View>
          <SelectCategoryModal
            selectedCategory={transaction.categoryId}
            onSelectCategory={(categoryId) =>
              setTransactionData("categoryId", categoryId)
            }
          />

          {validationErrors?.categoryId && (
            <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
          )}
        </View>
      </View>

      {/* TYPE OPTIONS */}
      <View className="mt-6 w-full">
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />

        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}
      </View>

      {/* CREATE BUTTON */}
      <Button onPress={handleUpdateTransaction} className="mt-10">
        {loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"}
      </Button>
    </View>
  )
}
