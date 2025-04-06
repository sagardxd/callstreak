import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../../features/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'ios_from_right', animationDuration: 5}}>
      <Stack.Screen name='Login' component={LoginScreen}  />
    </Stack.Navigator>
  )
}

export default AuthStack