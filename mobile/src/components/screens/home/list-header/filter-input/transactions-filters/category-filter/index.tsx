import { Text, TouchableOpacity, View } from "react-native"
import Checkbox from "expo-checkbox"

import { useTransactionContext } from "@/contexts/transaction.context"

import { colors } from "@/shared/colors"

export const CategoryFilter = () => {
  const { categories, handleCategoryFilter, filters } = useTransactionContext()

  return (
    <View className="gap-2">
      <Text className="font-bold text-gray-700 text-sm">Categoria</Text>

      {/* CATEGORY FILTERS */}
      <View>
        {categories.map((category) => (
          <TouchableOpacity
            key={`category-filter-${category.id}`}
            onPress={() => handleCategoryFilter(category.id)}
            className="flex-row items-center gap-2 py-2"
          >
            <Checkbox
              value={filters.categoryIds?.[category.id]}
              onValueChange={() => handleCategoryFilter(category.id)}
              color={
                filters.categoryIds?.[category.id]
                  ? colors["accent-brand"]
                  : colors.gray[800]
              }
              style={{
                borderRadius: 4,
                borderWidth: 1,
              }}
            />
            <Text className="text-base text-white">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
