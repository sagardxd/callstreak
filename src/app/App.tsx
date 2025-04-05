import { SafeAreaView } from "react-native";
import AppNavigator from "./navigation";

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
};


export default App;
