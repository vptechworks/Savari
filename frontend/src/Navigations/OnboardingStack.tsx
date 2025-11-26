import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import Location from "../screens/Location/Location";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

export default function OnboardingStack (){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}></Stack.Screen>
      <Stack.Screen name="Location" component={Location}></Stack.Screen>
      <Stack.Screen name="AuthStack" component={AuthStack}></Stack.Screen>
      <Stack.Screen name="AppStack" component={AppStack}></Stack.Screen>
    </Stack.Navigator>
  )
}