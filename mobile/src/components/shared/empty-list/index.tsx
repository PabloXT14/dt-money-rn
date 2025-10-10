import { Text, View } from "react-native"

type EmptyListProps = {
  message: string
}

export const EmptyList = ({ message }: EmptyListProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-600 text-lg">{message}</Text>
    </View>
  )
}
