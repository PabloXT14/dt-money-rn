import { dtMoneyApi } from "@/shared/api/dt-money"

import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"
import type { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"

export const getTransactionCategories = async (): Promise<
  ITransactionCategoryResponse[]
> => {
  const { data } = await dtMoneyApi.get<ITransactionCategoryResponse[]>(
    "/transaction/categories"
  )

  return data
}

export const createTransaction = async (data: ICreateTransactionRequest) => {
  await dtMoneyApi.post("/transaction", data)
}
