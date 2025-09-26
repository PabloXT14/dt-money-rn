/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */

import type { TotalTransactions } from "../total-transactions"
import type { Transaction } from "../transaction"

export interface IGetTransactionsResponse {
  data: Transaction[]
  totalRows: number
  totalPages: number
  page: number
  perPage: number
  totalTransactions: TotalTransactions
}
