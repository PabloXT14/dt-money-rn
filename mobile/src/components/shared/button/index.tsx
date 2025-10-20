import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import clsx from "clsx"

import { colors } from "@/shared/colors"

type ButtonMode = "fill" | "outline"

type ButtonProps = TouchableOpacityProps & {
  mode?: ButtonMode
  iconName?: keyof typeof MaterialIcons.glyphMap
  widthFull?: boolean
}

export const Button = ({
  mode = "fill",
  iconName,
  children,
  className,
  widthFull = true,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={clsx(
        "h-[57px] flex-row items-center rounded-lg px-5",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": mode === "fill",
          "border border-accent-brand bg-transparent": mode === "outline",
        },
        widthFull && "w-full",
        className
      )}
      {...rest}
    >
      <Text
        className={clsx("text-base", {
          "text-white": mode === "fill",
          "text-accent-brand": mode === "outline",
        })}
      >
        {children}
      </Text>

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={mode === "fill" ? colors.white : colors["accent-brand"]}
        />
      )}
    </TouchableOpacity>
  )
}
