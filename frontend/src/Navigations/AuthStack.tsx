import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/onboarding/Welcome";
import AccountCoverPage from "../screens/auth/AccountCoverPage";
const Stack = createNativeStackNavigator();

export default function AuthStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      <Stack.Screen name="AccountCoverPage" component={AccountCoverPage}></Stack.Screen>
    </Stack.Navigator>
  )
}