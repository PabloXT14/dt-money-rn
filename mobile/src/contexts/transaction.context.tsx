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
import type { IPagination } from "@/shared/interfaces/https/get-transactions-request"

// biome-ignore lint/performance/noNamespaceImport: disabled for clarity
import * as transactionService from "@/shared/services/dt-money/transaction.service"

type FetchTransactionsParams = {
  page: number
}

export type TransactionContextType = {
  categories: ITransactionCategoryResponse[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  isLoading: boolean
  fetchCategories: () => Promise<void>
  createTransaction: (data: ICreateTransactionRequest) => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  updateTransaction: (data: IUpdateTransactionRequest) => Promise<void>
  refreshTransactions: () => Promise<void>
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
  const [isLoading, setIsLoading] = useState(false)

  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
  })

  const refreshTransactions = async () => {
    setIsLoading(true)

    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })

    setTransactions(transactionResponse.data)
    setTotalTransactions(transactionResponse.totalTransactions)

    setIsLoading(false)
  }

  const fetchCategories = async () => {
    const fetchedCategories =
      await transactionService.getTransactionCategories()
    setCategories(fetchedCategories)
  }

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      setIsLoading(true)

      const transactionResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      })

      if (page === 1) {
        setTransactions(transactionResponse.data)
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ])
      }

      setTotalTransactions(transactionResponse.totalTransactions)
      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
      })

      setIsLoading(false)
    },
    [pagination]
  )

  const createTransaction = async (data: ICreateTransactionRequest) => {
    await transactionService.createTransaction(data)

    await refreshTransactions()
  }

  const updateTransaction = async (data: IUpdateTransactionRequest) => {
    await transactionService.updateTransaction(data)

    await refreshTransactions()
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        transactions,
        totalTransactions,
        isLoading,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        updateTransaction,
        refreshTransactions,
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
