import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react"

import type { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"

import { getTransactionCategories } from "@/shared/services/dt-money/transaction.service"

export type TransactionContextType = {
  categories: ITransactionCategoryResponse[]
  fetchCategories: () => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<ITransactionCategoryResponse[]>(
    []
  )

  const fetchCategories = async () => {
    const fetchedCategories = await getTransactionCategories()
    setCategories(fetchedCategories)
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
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
