import React, { useEffect,useState } from 'react';
import { View, Text ,ActivityIndicator} from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import SplashScreen from './src/screens/onboarding/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import Location from './src/screens/Location/Location'
import Welcome from './src/screens/onboarding/Welcome';
import HomeScreen from './src/screens/home/HomeScreen';
import AccountCoverPage from './src/screens/auth/AccountCoverPage';
import OTPScreen from './src/screens/auth/OTPScreen';
import HomeControler from './src/screens/home/HomeControler';
import SearchBar from './src/components/SearchBar';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Location: undefined;
  Welcome: undefined;
  AccountCoverPage: undefined;
  Home: undefined;
  HomeControler: undefined;
};

const Stack = createNativeStackNavigator();


const App = () => {
  const [loading, setLoading] = useState(true);
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("First Launch:", firstLaunch);

//  useEffect(() => {
//     const init = async () => {
//       await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
//       RNBootSplash.hide({ fade: true });
//     };
//     init();
//     const onboarded = AsyncStorage.getItem("hasOnboarded");
//     setFirstLaunch(!onboarded); // true if onboarding not done
//     setLoading(false);
//   }, []);

useEffect(() => {
    const init = async () => {
      try {
        // simulate small delay (optional)
        await new Promise<void>(resolve => setTimeout(resolve, 1500));

        // check onboarding
        const onboarded = await AsyncStorage.getItem("hasOnboarded");
        setFirstLaunch(!onboarded);

        // check login
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token);
      } catch (e) {
        console.log("Init error:", e);
      } finally {
        setLoading(false);
        RNBootSplash.hide({ fade: true }); // ✅ hide after decisions done
      }
    };

    init();
  }, []);

  if (loading) {
    // Temporary splash loader before deciding
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     {/* {firstLaunch ? (
    //       <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    //     ) : (
    //       // <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //       <Stack.Screen name="Welcome" component={Welcome} />
    //     )} */}
    //     <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    //     <Stack.Screen name="Location" component={Location} />
    //     <Stack.Screen name="Welcome" component={Welcome} />
    //     <Stack.Screen name="AccountCoverPage" component={AccountCoverPage} />
    //     <Stack.Screen name="HomeControler"
    //     component={HomeControler} />
    //     <Stack.Screen name="SearchBar"
    //     component={SearchBar}  />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? <Stack.Screen name="Splash" component={SplashScreen} /> : null}
        {firstLaunch ? (
          // 👉 First time install
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : isLoggedIn ? (
          // 👉 Already logged in
          <>
          <Stack.Screen name="HomeControler" component={HomeControler} />
          <Stack.Screen name="SearchBar" component={SearchBar}  />
          </>
        ) : (
          // 👉 Not logged in
          <>
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="AccountCoverPage" component={AccountCoverPage} />
            <Stack.Screen name="HomeControler" component={HomeControler} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
