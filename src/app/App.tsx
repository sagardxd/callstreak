import { SafeAreaView } from "react-native";
import AppNavigator from "./navigation";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
};


export default App;
