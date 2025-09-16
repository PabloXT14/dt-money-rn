import { Text, View } from "react-native"
import clsx from "clsx"

import { useSnackbarContext } from "@/contexts/snackbar.context"

export const Snackbar = () => {
  const { message, type } = useSnackbarContext()

  if (!(message && type)) {
    return null
  }

  return (
    <View
      className={clsx(
        "absolute bottom-12 z-10 h-14 w-[90%] justify-center self-center rounded-xl px-4",
        type === "SUCCESS" && "bg-accent-brand-background-primary",
        type === "ERROR" && "bg-accent-red-background-primary",
        !type && "bg-background-secondary"
      )}
    >
      <Text className="font-bold text-base text-white">{message}</Text>
    </View>
  )
}
