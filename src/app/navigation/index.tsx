import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack"
import AuthStack from "./AuthStack"

const user = false;

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {user ? <MainStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default AppNavigator