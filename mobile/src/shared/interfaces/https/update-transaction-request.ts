/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */
export interface IUpdateTransactionRequest {
  id: number
  typeId: number
  categoryId: number
  value: number
  description: string
}
