import { useMemo, useState } from "react"
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native"
import { Checkbox } from "expo-checkbox"
import clsx from "clsx"

import { useTransactionContext } from "@/contexts/transaction.context"
import { colors } from "@/shared/colors"

type SelectCategoryModalProps = {
  selectedCategory: number
  onSelectCategory: (categoryId: number) => void
}

export const SelectCategoryModal = ({
  selectedCategory,
  onSelectCategory,
}: SelectCategoryModalProps) => {
  const [showModal, setShowModal] = useState(false)

  const { categories } = useTransactionContext()

  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState)
  }

  const handleSelectCategory = (categoryId: number) => {
    onSelectCategory(categoryId)
    handleToggleModal()
  }

  const selectedCategoryData = useMemo(() => {
    return categories.find((category) => category.id === selectedCategory)
  }, [categories, selectedCategory])

  return (
    <>
      <TouchableOpacity
        onPress={handleToggleModal}
        className="h-14 w-full justify-center rounded-lg bg-background-primary px-4"
        activeOpacity={0.8}
      >
        <Text
          className={clsx(
            "text-base",
            selectedCategory ? "text-white" : "text-gray-700"
          )}
        >
          {selectedCategoryData?.name ?? "Categoria"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        {/* OVERLAY */}
        <TouchableWithoutFeedback onPress={handleToggleModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            {/* CONTENT */}
            <View className="w-[90%] rounded-xl bg-background-secondary p-4">
              <Text className="mb-4 font-bold text-lg text-white">
                Selecione uma categoria
              </Text>

              <FlatList
                data={categories}
                keyExtractor={(item) => `category-${item.id}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectCategory(item.id)}
                    className={clsx(
                      "mb-2 flex-row items-center gap-2 rounded-lg bg-gray-800 p-4",
                      item.id === selectedCategory &&
                        "bg-accent-brand-background-primary"
                    )}
                  >
                    <Checkbox
                      value={item.id === selectedCategory}
                      onValueChange={() => handleSelectCategory(item.id)}
                      color={
                        item.id === selectedCategory
                          ? colors["accent-brand"]
                          : colors.gray[700]
                      }
                      style={{
                        borderRadius: 4,
                        borderWidth: 1,
                      }}
                    />

                    <Text className="text-base text-white">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
