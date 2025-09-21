import { dtMoneyApi } from "@/shared/api/dt-money"
import type { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"

export const getTransactionCategories = async (): Promise<
  ITransactionCategoryResponse[]
> => {
  const { data } = await dtMoneyApi.get<ITransactionCategoryResponse[]>(
    "/transaction/categories"
  )

  return data
}
