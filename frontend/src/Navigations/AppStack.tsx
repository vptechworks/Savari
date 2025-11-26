import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeControler from '../screens/home/HomeControler';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeControler" component={HomeControler} />
  </Stack.Navigator>
);

export default AppStack;
