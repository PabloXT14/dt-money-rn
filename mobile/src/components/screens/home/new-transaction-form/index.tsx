import { useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import CurrencyInput from "react-native-currency-input"
import { ZodError } from "zod"

import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"

import { useBottomSheetContext } from "@/contexts/bottomsheet.context"
import { useTransactionContext } from "@/contexts/transaction.context"
import { useErrorHandler } from "@/shared/hooks/user-error-handler"
import { useSnackbarContext } from "@/contexts/snackbar.context"

import { colors } from "@/shared/colors"

import { TransactionTypeSelector } from "@/components/shared/transaction-type-selector"
import { SelectCategoryModal } from "@/components/shared/select-category-modal"
import { Button } from "@/components/shared/button"
import { ErrorMessage } from "@/components/shared/error-message"

import { newTransactionFormSchema } from "./schema"

type ValidationErrorsType = Record<keyof ICreateTransactionRequest, string>

export const NewTransactionForm = () => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { createTransaction } = useTransactionContext()
  const { handleError } = useErrorHandler()
  const { notify } = useSnackbarContext()

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    categoryId: 0,
    typeId: 0,
    description: "",
    value: 0,
  })
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>()
  const [loading, setLoading] = useState(false)

  const handleCreateNewTransaction = async () => {
    try {
      setLoading(true)

      newTransactionFormSchema.parse(transaction)

      await createTransaction(transaction)

      notify({
        message: "Transação criada com sucesso!",
        messageType: "SUCCESS",
      })

      closeBottomSheet()
    } catch (error) {
      if (error instanceof ZodError) {
        // biome-ignore lint/suspicious/noConsole: debug
        console.log(error)

        const errors = {} as ValidationErrorsType

        for (const issue of error.issues) {
          errors[issue.path[0] as keyof ICreateTransactionRequest] =
            issue.message
        }

        setValidationErrors(errors)
      } else {
        handleError(error, "Falha ao criar transação.")
      }
    } finally {
      setLoading(false)
    }
  }

  const setTransactionData = (
    key: keyof ICreateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevState) => ({ ...prevState, [key]: value }))
  }

  return (
    <View className="p-6">
      {/* HEADER */}
      <View className="w-full flex-row items-center justify-between">
        <Text className="font-bold text-white text-xl">Nova transação</Text>

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
      <Button onPress={handleCreateNewTransaction} className="mt-10">
        {loading ? <ActivityIndicator color={colors.white} /> : "Cadastrar"}
      </Button>
    </View>
  )
}
