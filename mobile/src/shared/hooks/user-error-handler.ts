import { useSnackbarContext } from "@/contexts/snackbar.context"

import { AppError } from "../helpers/app-error"

export const useErrorHandler = () => {
  const { notify } = useSnackbarContext()

  const handleError = (error: unknown, defaultMessage?: string) => {
    // biome-ignore lint/suspicious/noConsole: debugging
    console.log(error)

    const isAppError = error instanceof AppError

    const message = isAppError
      ? error.message
      : defaultMessage || "Falha ao realizar a requisição."

    notify({ message, type: "ERROR" })
  }

  return { handleError }
}
