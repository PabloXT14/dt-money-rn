import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/shared/colors"

import { DeleteModal } from "./delete-modal"

export const RightAction = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-[140px] w-[80px] items-center justify-center rounded-r-md bg-accent-red-background-primary"
        onPress={showModal}
      >
        <MaterialIcons name="delete-outline" size={24} color={colors.white} />
      </TouchableOpacity>

      <DeleteModal visible={modalVisible} onHideModal={hideModal} />
    </>
  )
}
