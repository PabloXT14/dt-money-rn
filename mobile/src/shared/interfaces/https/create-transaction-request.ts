/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */
export interface ICreateTransactionRequest {
  description: string
  typeId: number
  categoryId: number
  value: number
}
