import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../features/home/screens/Home';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='home' component={Home} />
    </Stack.Navigator>
  )
}

export default MainStack