import {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react"

type BottomSheetContextType = {
  openBottomSheet: (content: ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
)

export const BottomSheetContextProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<ReactNode | null>(null)

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setContent(newContent)
    },
    []
  )

  const closeBottomSheet = useCallback(() => {
    setContent(null)
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  )
}
