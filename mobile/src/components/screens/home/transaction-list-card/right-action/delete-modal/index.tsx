import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/shared/colors"

type DeleteModalProps = {
  visible: boolean
  onHideModal: () => void
}

export const DeleteModal = ({ visible, onHideModal }: DeleteModalProps) => {
  return (
    <View className="absolute flex-1">
      <Modal
        visible={visible}
        onRequestClose={onHideModal}
        animationType="slide"
        transparent
      >
        {/* OVERLAY */}
        <TouchableWithoutFeedback onPress={onHideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            {/* CONTENT */}
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="z-10 m-5 h-[322px] w-[90%] gap-4 rounded-xl bg-background-secondary p-4 shadow-lg">
                {/* HEADER */}
                <View className="w-full flex-row items-center justify-center gap-2 p-3">
                  <MaterialIcons
                    name="error-outline"
                    size={24}
                    color={colors.gray[400]}
                  />

                  <Text className="flex-1 text-white text-xl">
                    Apagar transação?
                  </Text>

                  <TouchableOpacity activeOpacity={0.8}>
                    <MaterialIcons
                      name="close"
                      size={24}
                      color={colors.gray[800]}
                      onPress={onHideModal}
                    />
                  </TouchableOpacity>
                </View>

                {/* DIVIDER */}
                <View className="h-px w-full bg-background-tertiary" />

                {/* BODY */}
                <View />

                {/* DIVIDER */}
                <View className="h-px w-full bg-background-tertiary" />

                {/* FOOTER */}
                <View />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
