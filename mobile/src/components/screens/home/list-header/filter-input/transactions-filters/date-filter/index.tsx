import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { format } from "date-fns"
import clsx from "clsx"

export const DateFilter = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const onChangeStartDatePicker = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowStartDatePicker(false)

    if (event.type === "set" && selectedDate) {
      setStartDate(selectedDate)
    }
  }

  const onChangeEndDatePicker = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowEndDatePicker(false)

    if (event.type === "set" && selectedDate) {
      setEndDate(selectedDate)
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
                startDate ? "text-white" : "text-gray-700"
              )}
            >
              {startDate ? format(startDate, "dd/MM/yyyy") : "De"}
            </Text>
          </TouchableOpacity>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
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
                endDate ? "text-white" : "text-gray-700"
              )}
            >
              {endDate ? format(endDate, "dd/MM/yyyy") : "Até"}
            </Text>
          </TouchableOpacity>

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
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
