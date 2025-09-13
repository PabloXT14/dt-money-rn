import type { IUser } from "./user-interface"

export type RestoreSessionResponse = {
  user: IUser | null
  token: string | null
}
