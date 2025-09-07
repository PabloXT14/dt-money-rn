import { useRef, useState } from "react"
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
import { MaterialIcons } from "@expo/vector-icons"
import clsx from "clsx"

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
  label,
  leftIconName,
  secureTextEntry,
  ...rest
}: InputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showText, setShowText] = useState(secureTextEntry)

  const inputRef = useRef<TextInput>(null)

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused())
    }
  }

  const handleToggleTextVisibility = () => {
    setShowText((prevState) => !prevState)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mt-4 w-full">
          {label && (
            <Text
              className={clsx(
                "mt-3 mb-2 font-medium text-xs",
                isFocused ? "text-accent-brand" : "text-gray-600"
              )}
            >
              {label}
            </Text>
          )}

          <TouchableOpacity className="h-16 flex-row items-center justify-between border-gray-600 border-b px-3 py-2">
            {leftIconName && (
              <MaterialIcons
                name={leftIconName}
                size={24}
                color={isFocused ? colors["accent-brand"] : colors.gray[600]}
                className="mr-2"
              />
            )}

            <TextInput
              ref={inputRef}
              onFocus={checkFocus}
              onEndEditing={checkFocus}
              value={value}
              onChangeText={onChange}
              placeholderTextColor={colors.gray[700]}
              className="flex-1 text-base text-gray-500"
              secureTextEntry={showText}
              {...rest}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={handleToggleTextVisibility}>
                <MaterialIcons
                  name={showText ? "visibility" : "visibility-off"}
                  size={24}
                  color={colors.gray[600]}
                  className="ml-2"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {error && (
            <Text className="mt-1 text-red-500 text-sm">{error.message}</Text>
          )}
        </View>
      )}
    />
  )
}
