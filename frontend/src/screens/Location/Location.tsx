// src/screens/LocationPermissionScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS, openSettings } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import Loader from "../../components/Loader";
import Svg , {Path} from "react-native-svg";


type RootStackParamList = {
  LocationPermission: undefined;
  AuthStack: undefined;
};

type LocationPermissionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LocationPermission"
>;

const LocationPermissionScreen = () => {
  const navigation = useNavigation<LocationPermissionScreenNavigationProp>();
  const [loading , setLoading ] = useState(false)

  const requestLocation = async () => {
  try {
    setLoading(true);

    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log("Location:", position);
            navigation.replace("AuthStack"); // ✅ redirect
        },
        (error) => {
          console.log("Location error:", error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else if (result === RESULTS.DENIED) {
      console.log("Permission denied by user");
      setLoading(false);
    } else if (result === RESULTS.BLOCKED) {
      console.log("Permission permanently blocked. Ask user to enable in settings.");
      setLoading(false);
      // 👉 here you can show an Alert linking to Settings if needed
      Alert.alert(
        "Location Permission Required",
        "You have permanently denied location permission. Please enable it from settings to continue.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => {
              openSettings().catch(() => {
                console.warn("Cannot open settings");
              });
            },
          },
        ]
      );
    } else {
      console.log("Other permission result:", result);
      setLoading(false);
    }
  } catch (error) {
    console.log("Location error:", error);
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      {loading && <Loader /> }
      <View style={styles.card}>
        <View style={styles.iconCircle}>
<Svg
  width={50}
  height={50}
  viewBox="0 0 24 24"
  fill="none"
  stroke="#d0a825"
  strokeWidth={2}
>
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  />
  <Path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
  />
</Svg>

        </View>
        <Text style={styles.title}>Enable your location</Text>
        <Text style={styles.subtitle}>
          Choose your location to start find the request around you
        </Text>

        <TouchableOpacity style={styles.button} onPress={requestLocation}>
          <Text style={styles.buttonText}>Use my location</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace("AuthStack")} style={styles.skipBtnText}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff3cd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  pinIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#d0a825",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  skipBtnText: {
    borderColor: "#d0a825",
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  skipText: {
    color: "#d0a825",
    fontSize: 16,
    fontWeight: "600",
  },
});
