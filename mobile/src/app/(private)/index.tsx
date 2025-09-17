import { Header } from "@/components/screens/home/header"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <Header />
    </SafeAreaView>
  )
}
