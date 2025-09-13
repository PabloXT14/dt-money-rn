/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */
import type { IUser } from "../user-interface"

export interface IRegisterResponse {
  user: IUser
  token: string
}
