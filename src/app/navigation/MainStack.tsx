import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../features/home/screens/Home';
import ContactListScreen from '../../features/contacts/screens/ContactListScreen';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade_from_bottom', animationDuration: 5}}>
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='contactlist' component={ContactListScreen} />
    </Stack.Navigator>
  )
}

export default MainStack