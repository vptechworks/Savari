import React from "react";
import { Text, View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { Path, Circle } from "react-native-svg";

//Tab Screens
import HomeScreen from "./HomeScreen";
import RideHistory from "./RideHistory";
import Account from "./Account";

const Tab = createBottomTabNavigator();

// Icon Components
const HomeIcon = ({ color,strokeWidth }: { color: string,strokeWidth: number }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
  </Svg>
);

const PastIcon = ({ color, strokeWidth }: { color: string, strokeWidth: number }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <Path d="M3 3v5h5" />
    <Path d="M12 7v5l4 2" />
  </Svg>
);

const AccountIcon = ({ color, strokeWidth }: { color: string, strokeWidth: number }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={10} />
    <Circle cx={12} cy={10} r={3} />
    <Path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </Svg>
);

export default function HomeControler() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          height:75,
          borderTopWidth: 0.5,
          borderTopColor: "#d0a825",
          
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        // tabBarButton: React.forwardRef((props, ref) => (
        //   <Pressable
        //     ref={ref as React.Ref<View>}
        //     {...props}
        //     android_ripple={{ color: "#e0e0e0", borderless: false }}
        //     style={({ pressed }) => [
        //       props.style,
        //       { opacity: pressed ? 0.6 : 1 }, // iOS press feedback
        //     ]}
        //   />
        // )),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
    tabBarIcon: ({ color, focused }) => (
      <View
        style={{
          backgroundColor: focused ? "#d0a825" : "transparent", 
          marginTop:12,
          padding: 8,
          borderRadius: 20,
          width: 65,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HomeIcon color={focused ? "#000" : "gray"} strokeWidth={focused ? 2 : 1.8} /> 
      </View>
    ),
    tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop:10,
                color: focused ? "#000" : "gray",
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "800" : "600",
              }}
            >
              Home
            </Text>
          ),
  }}
      />
      <Tab.Screen
        name="Past"
        component={RideHistory}
        options={{
    tabBarIcon: ({ color, focused }) => (
      <View
        style={{
          backgroundColor: focused ? "#d0a825" : "transparent", 
          marginTop:12,
          padding: 8,
          borderRadius: 20,
          width: 65,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PastIcon color={focused ? "#000" : "gray"} strokeWidth={focused ? 2 : 1.8} /> 
      </View>
    ),
    tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop:10,
                color: focused ? "#000" : "gray",
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "800" : "600",
              }}
            >
              Past
            </Text>
          ),
  }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
    tabBarIcon: ({ color, focused }) => (
      <View
        style={{
          backgroundColor: focused ? "#d0a825" : "transparent", 
          marginTop:12,
          padding: 8,
          borderRadius: 20,
          width: 65,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountIcon color={focused ? "#000" : "gray"} strokeWidth={focused ? 2 : 1.8} /> 
      </View>
    ),
    tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginTop:10,
                color: focused ? "#000" : "gray",
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "800" : "600",
              }}
            >
              Account
            </Text>
          ),
  }}
      />
    </Tab.Navigator>
  );
}
