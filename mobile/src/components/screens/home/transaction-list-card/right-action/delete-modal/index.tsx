import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/shared/colors"

type DeleteModalProps = {
  visible: boolean
  onHideModal: () => void
  onDelete: () => void
  loading: boolean
}

export const DeleteModal = ({
  visible,
  onHideModal,
  onDelete,
  loading,
}: DeleteModalProps) => {
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
                <View className="flex-1 justify-center px-4 py-5">
                  <Text className="text-base text-gray-500 leading-7">
                    Tem certeza de que deseja apagar esta transação? Esta ação
                    não pode ser desfeita.
                  </Text>
                </View>

                {/* DIVIDER */}
                <View className="h-px w-full bg-background-tertiary" />

                {/* FOOTER */}
                <View className="w-full flex-row items-end justify-end gap-3 p-3">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onHideModal}
                    className="w-[100px] items-center justify-center rounded-md border border-accent-brand p-3"
                  >
                    <Text className="text-accent-brand text-sm">Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onDelete}
                    className="w-[100px] items-center justify-center rounded-md bg-accent-red-background-primary p-3"
                  >
                    <Text className="font-bold text-sm text-white">
                      {loading ? (
                        <ActivityIndicator color={colors.white} />
                      ) : (
                        "Apagar"
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
