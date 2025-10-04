import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react"

import type { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"
import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"
import type { IUpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request"
import type { Transaction } from "@/shared/interfaces/transaction"
import type { TotalTransactions } from "@/shared/interfaces/total-transactions"

// biome-ignore lint/performance/noNamespaceImport: disabled for clarity
import * as transactionService from "@/shared/services/dt-money/transaction.service"

export type TransactionContextType = {
  categories: ITransactionCategoryResponse[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  fetchCategories: () => Promise<void>
  createTransaction: (data: ICreateTransactionRequest) => Promise<void>
  fetchTransactions: () => Promise<void>
  updateTransaction: (data: IUpdateTransactionRequest) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<ITransactionCategoryResponse[]>(
    []
  )
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    }
  )

  const fetchCategories = async () => {
    const fetchedCategories =
      await transactionService.getTransactionCategories()
    setCategories(fetchedCategories)
  }

  const createTransaction = async (data: ICreateTransactionRequest) => {
    await transactionService.createTransaction(data)
  }

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })

    setTransactions(transactionResponse.data)
    setTotalTransactions(transactionResponse.totalTransactions)
  }, [])

  const updateTransaction = async (data: IUpdateTransactionRequest) => {
    await transactionService.updateTransaction(data)
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        transactions,
        totalTransactions,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        updateTransaction,
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
