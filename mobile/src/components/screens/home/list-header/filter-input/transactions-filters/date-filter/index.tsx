import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { format } from "date-fns"
import clsx from "clsx"
import { useTransactionContext } from "@/contexts/transaction.context"

export const DateFilter = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const { filters, handleFilters } = useTransactionContext()

  const onChangeStartDatePicker = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowStartDatePicker(false)

    if (event.type === "set" && selectedDate) {
      handleFilters({ key: "from", value: selectedDate })
    }
  }

  const onChangeEndDatePicker = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowEndDatePicker(false)

    if (event.type === "set" && selectedDate) {
      handleFilters({ key: "to", value: selectedDate })
    }
  }

  return (
    <View className="gap-2">
      <Text className="font-bold text-gray-700 text-sm">Data</Text>

      {/* DATE FILTERS */}
      <View className="w-full flex-row gap-5">
        {/* START DATE */}
        <View className="flex-1">
          <TouchableOpacity
            className="w-full border-gray-800 border-b p-4"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text
              className={clsx(
                "text-base",
                filters.from ? "text-white" : "text-gray-700"
              )}
            >
              {filters.from ? format(filters.from, "dd/MM/yyyy") : "De"}
            </Text>
          </TouchableOpacity>

          {showStartDatePicker && (
            <DateTimePicker
              value={filters.from || new Date()}
              mode="date"
              display="default"
              onChange={onChangeStartDatePicker}
              locale="pt_BR"
            />
          )}
        </View>

        {/* END DATE */}
        <View className="flex-1">
          <TouchableOpacity
            className="w-full border-gray-800 border-b p-4"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text
              className={clsx(
                "text-base",
                filters.to ? "text-white" : "text-gray-700"
              )}
            >
              {filters.to ? format(filters.to, "dd/MM/yyyy") : "Até"}
            </Text>
          </TouchableOpacity>

          {showEndDatePicker && (
            <DateTimePicker
              value={filters.to || new Date()}
              mode="date"
              display="default"
              onChange={onChangeEndDatePicker}
              locale="pt_BR"
            />
          )}
        </View>
      </View>
    </View>
  )
}
