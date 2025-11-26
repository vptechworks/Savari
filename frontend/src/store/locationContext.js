import { createContext,useState,useContext } from "react";
import {PERMISSIONS,RESULTS,check} from "react-native-permissions"
import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

const LocationContext = createContext()

export const LocationProvider = ({children}) => {
  const [isLocation,setIslocation] = useState(false);
  
  const checkLocation = async () => {
    console.log("check Location is executeing");
    try {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      // Wrap Geolocation.getCurrentPosition in a Promise
      const locationGranted = await new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log("Location:", position);
            setIslocation(true); 
            resolve(true)// Location granted and obtained
          },
          (error) => {
            console.log("Location error:", error.message);
            resolve(false)// Location permission granted but couldn't get location
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
      
      return locationGranted;
    } else if (result === RESULTS.DENIED) {
      console.log("Permission denied by user");
      setIslocation(false);
    } else if (result === RESULTS.BLOCKED) {
      console.log("Permission permanently blocked.");
      setIslocation(false);
    } else {
      console.log("Other permission result:", result);
      setIslocation(false);
    }
  } catch (error) {
    console.log("Location error:", error);
    setIslocation(false);
  }
  }

  return (
    <LocationContext.Provider
    value={{
      isLocation,
      checkLocation,
    }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext)