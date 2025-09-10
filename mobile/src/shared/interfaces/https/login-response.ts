/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: disabled */
import type { IUser } from "../user-interface"

export interface ILoginResponse {
  user: IUser
  token: string
}
