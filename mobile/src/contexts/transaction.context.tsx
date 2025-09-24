import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react"

import type { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"
import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"

// biome-ignore lint/performance/noNamespaceImport: disabled for clarity
import * as transactionService from "@/shared/services/dt-money/transaction.service"

export type TransactionContextType = {
  categories: ITransactionCategoryResponse[]
  fetchCategories: () => Promise<void>
  createTransaction: (data: ICreateTransactionRequest) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<ITransactionCategoryResponse[]>(
    []
  )

  const fetchCategories = async () => {
    const fetchedCategories =
      await transactionService.getTransactionCategories()
    setCategories(fetchedCategories)
  }

  const createTransaction = async (data: ICreateTransactionRequest) => {
    await transactionService.createTransaction(data)
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  return context
}
