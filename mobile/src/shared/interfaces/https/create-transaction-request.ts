/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */
export interface ICreateTransactionRequest {
  description: string
  typedId: number
  categoryId: number
  value: number
}
