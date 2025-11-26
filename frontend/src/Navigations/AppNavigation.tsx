import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import { useAuth } from '../store/AuthContext';
import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: undefined;
  Location:undefined;
  AuthStack: undefined;
  AppStack: undefined;
};

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { loading, firstLaunch, isLoggedIn } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loading && <Stack.Screen name="Splash" component={SplashScreen} />}

      {!loading && firstLaunch && (
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      )}

      {!loading && !firstLaunch && isLoggedIn && (
        <Stack.Screen name="AppStack" component={AppStack} />
      )}

      {!loading && !firstLaunch && !isLoggedIn && (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;
