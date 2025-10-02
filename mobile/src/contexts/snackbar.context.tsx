import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useState,
} from "react"

export type SnackbarMessageType = "ERROR" | "SUCCESS"

export type NotifyMessageParams = {
  message: string
  messageType: SnackbarMessageType
}

export type SnackbarContextType = {
  message: string | null
  type: SnackbarMessageType | null
  notify: (params: NotifyMessageParams) => void
}

export const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType
)

const SNACKBAR_AUTO_HIDE_DURATION_MS = 3000

export const SnackbarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<SnackbarMessageType | null>(null)

  // biome-ignore lint/nursery/noShadow: disabled for clarity
  const notify = ({ message, messageType }: NotifyMessageParams) => {
    setMessage(message)
    setType(messageType)

    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, SNACKBAR_AUTO_HIDE_DURATION_MS)
  }

  return (
    <SnackbarContext.Provider value={{ message, type, notify }}>
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext)

  return context
}
