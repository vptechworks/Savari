import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNBootSplash from "react-native-bootsplash"

type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  firstLaunch: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  onboarded: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState(false);

  // -----------------------------
  // 🔥 CHECK APP STARTUP STATUS
  // -----------------------------
  useEffect(() => {
    const loadData = async () => {
      try {

        await new Promise<void>(resolve => setTimeout(resolve, 1500));

        const storedToken =  await AsyncStorage.getItem("accessToken");
        const onboardingDone = await AsyncStorage.getItem("hasOnboarded");

        if (!onboardingDone) {
          setFirstLaunch(true);
        } else {
          setFirstLaunch(false);
        }

        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
        RNBootSplash.hide({ fade: true });
      }
    };

    loadData();
  }, []);


  // Onboarded -- First Launch 
  const onboarded = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true")
      setFirstLaunch(false);
    } catch (error) {
      console.log("onboard error: ",error)
    }
  }

  // --------------------------------
  // 🔥 LOGIN (SAVE TOKEN)
  // --------------------------------
  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("accessToken",token)
      // await Keychain.setGenericPassword("onboardingDone", "true");

      setToken(token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  // --------------------------------
  // 🔥 LOGOUT (REMOVE TOKEN)
  // --------------------------------
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setToken(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        loading,
        firstLaunch,
        login,
        logout,
        onboarded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
