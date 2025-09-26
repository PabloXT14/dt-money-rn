/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */

export interface IGetTransactionsRequest {
  page: number
  perPage: number
  from?: Date
  to?: Date
  typeId?: number
  categoryIds?: number[]
  searchText?: string
}
