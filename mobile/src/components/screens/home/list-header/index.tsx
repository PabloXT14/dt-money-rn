import { ScrollView, Text, View } from "react-native"

import { Header } from "../header"

export const ListHeader = () => {
  return (
    <>
      <Header />

      {/* SUMMARY CARDS */}
      <View className="h-[150px] w-full">
        <View className="h-[50px] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute h-[141px] pl-8"
        >
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
          <Text className="text-white">Teste</Text>
        </ScrollView>
      </View>
    </>
  )
}
