import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native"
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"
import type { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"

type InputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T>
  name: Path<T>
  leftIconName?: keyof typeof MaterialIcons.glyphMap
  label?: string
}

export const Input = <T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  ...rest
}: InputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="w-full">
          {label && <Text className="text-white uppercase">{label}</Text>}

          <TouchableOpacity className="h-16 flex-row items-center justify-between border-gray-600 border-b px-3 py-2">
            <TextInput
              value={value}
              onChangeText={onChange}
              {...rest}
              placeholderTextColor={colors.gray[700]}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  )
}
