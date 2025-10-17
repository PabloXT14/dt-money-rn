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
import type {
  IFilters,
  IPagination,
} from "@/shared/interfaces/https/get-transactions-request"

// biome-ignore lint/performance/noNamespaceImport: disabled for clarity
import * as transactionService from "@/shared/services/dt-money/transaction.service"

type FetchTransactionsParams = {
  page: number
}

type Loadings = {
  initial: boolean
  refresh: boolean
  loadMore: boolean
}

type HandleLoadingsParams = {
  key: keyof Loadings
  value: boolean
}

type HandleFiltersParams = {
  key: keyof IFilters
  value: IFilters[keyof IFilters]
}

export type TransactionContextType = {
  categories: ITransactionCategoryResponse[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  loadings: Loadings
  pagination: IPagination
  searchText: string
  filters: IFilters
  fetchCategories: () => Promise<void>
  createTransaction: (data: ICreateTransactionRequest) => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  updateTransaction: (data: IUpdateTransactionRequest) => Promise<void>
  refreshTransactions: () => Promise<void>
  loadMoreTransactions: () => Promise<void>
  handleLoadings: (params: HandleLoadingsParams) => void
  setSearchText: (text: string) => void
  handleFilters: (params: HandleFiltersParams) => void
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

const AMOUNT_OF_TRANSACTIONS_PER_PAGE = 10

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

  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  })

  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: AMOUNT_OF_TRANSACTIONS_PER_PAGE,
    totalRows: 0,
    totalPages: 0,
  })

  const [searchText, setSearchText] = useState("")

  const [filters, setFilters] = useState<IFilters>({
    from: undefined,
    to: undefined,
    typeId: undefined,
    categoryIds: {},
  })

  const handleLoadings = ({ key, value }: HandleLoadingsParams) => {
    setLoadings((prevState) => ({ ...prevState, [key]: value }))
  }

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination

    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage, // Assim ele pega todas as transações que já foram carregadas até o momento
    })

    setTransactions(transactionResponse.data)
    setTotalTransactions(transactionResponse.totalTransactions)
    setPagination({
      ...pagination,
      page,
      totalRows: transactionResponse.totalRows,
      totalPages: transactionResponse.totalPages,
    })
  }, [pagination])

  const fetchCategories = async () => {
    const fetchedCategories =
      await transactionService.getTransactionCategories()
    setCategories(fetchedCategories)
  }

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      const transactionResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText,
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
        totalPages: transactionResponse.totalPages,
      })
    },
    [pagination, searchText]
  )

  const createTransaction = async (data: ICreateTransactionRequest) => {
    await transactionService.createTransaction(data)

    await refreshTransactions()
  }

  const updateTransaction = async (data: IUpdateTransactionRequest) => {
    await transactionService.updateTransaction(data)

    await refreshTransactions()
  }

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) {
      return
    }

    await fetchTransactions({ page: pagination.page + 1 })
  }, [loadings.loadMore, pagination])

  const handleFilters = ({ key, value }: HandleFiltersParams) => {
    setFilters((prevState) => ({ ...prevState, [key]: value }))
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        transactions,
        totalTransactions,
        loadings,
        pagination,
        searchText,
        filters,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        updateTransaction,
        refreshTransactions,
        loadMoreTransactions,
        handleLoadings,
        setSearchText,
        handleFilters,
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
