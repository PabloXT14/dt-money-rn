/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */

export interface IPagination {
  page: number
  perPage: number
  totalRows: number
  totalPages: number
}

export interface IGetTransactionsRequest {
  page: number
  perPage: number
  from?: Date
  to?: Date
  typeId?: number
  categoryIds?: number[]
  searchText?: string
}

export interface IFilters {
  from?: Date
  to?: Date
  typeId?: number
  categoryIds?: Record<number, boolean>
}
