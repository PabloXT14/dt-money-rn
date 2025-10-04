import qs from "qs"

import { dtMoneyApi } from "@/shared/api/dt-money"

import type { ICreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request"
import type { ITransactionCategoryResponse } from "@/shared/interfaces/https/transaction-category-response"
import type { IGetTransactionsRequest } from "@/shared/interfaces/https/get-transactions-request"
import type { IGetTransactionsResponse } from "@/shared/interfaces/https/get-transactions-response"
import type { IUpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request"

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

export const getTransactions = async (
  params: IGetTransactionsRequest
): Promise<IGetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<IGetTransactionsResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (par) =>
        qs.stringify(par, {
          arrayFormat: "repeat", // para evitar que o axios formate os arrays de valores que vão para o back-end no formato errado (ex: categoryIds[]=1&categoryIds[]=2&categoryIds[]=3 -> categoryIds[0]=1&categoryIds[1]=2&categoryIds[2]=3)])
        }),
    }
  )

  return data
}

export const deleteTransaction = async (transactionId: number) => {
  await dtMoneyApi.delete(`/transaction/${transactionId}`)
}

export const updateTransaction = async (data: IUpdateTransactionRequest) => {
  await dtMoneyApi.put("/transaction", data)
}
