import { Alert, Platform } from "react-native";
import Geolocation, {
  GeoError,
  GeoPosition,
} from "react-native-geolocation-service";
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
  Permission,
} from "react-native-permissions";

export const LocationComponent = async (): Promise<boolean> => {
  try {
    const permission: Permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return new Promise<boolean>((resolve) => {
        Geolocation.getCurrentPosition(
          (position: GeoPosition) => {
            console.log("📍 Location available:", position);
            resolve(true); // ✅ Location ON
          },
          (error: GeoError) => {
            console.log("❌ GPS OFF or not available:", error);
            Alert.alert(
              "Location Required",
              "Please enable device location services.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Open Settings", onPress: () => openSettings() },
              ]
            );
            resolve(false); // ❌ Location OFF
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );
      });
    } else {
      console.log("⚠️ Location permission not granted");
      return false;
    }
  } catch (err) {
    console.log("Location check error:", err);
    return false;
  }
};
