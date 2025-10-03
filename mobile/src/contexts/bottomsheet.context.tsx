import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"

import { colors } from "@/shared/colors"

type BottomSheetContextType = {
  openBottomSheet: (content: ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
)

export const BottomSheetContextProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<ReactNode | null>(null)
  const [index, setIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const insets = useSafeAreaInsets()

  const snapPoints = ["70%", "90%"]

  const openBottomSheet = useCallback(
    (newContent: ReactNode, newIndex: number) => {
      setContent(newContent)
      setIsOpen(true)
      setIndex(newIndex)

      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(newIndex)
      })
    },
    []
  )

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false)
    setContent(null)
    setIndex(-1)
    bottomSheetRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((newIndex: number) => {
    if (newIndex === -1) {
      closeBottomSheet()
    }
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="absolute inset-0 bg-black/70" />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        style={{
          zIndex: 2,
        }}
        index={index}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colors["background-secondary"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.gray[800],
          width: 50,
          height: 4,
        }}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
        >
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  )
}

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext)

  return context
}
