/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */

export interface IUser {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
