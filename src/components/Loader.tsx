import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing, StyleSheet } from "react-native";

type Props = {
  size?: number;      // image size
  speedMs?: number;   // rotation speed
};

const Loader: React.FC<Props> = ({ size = 70, speedMs = 700 }) => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: speedMs,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [rotate, speedMs]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/loader/wheel.png")}
        style={{
          width: size,
          height: size,
          transform: [{ rotate: spin }],
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)", // transparent black background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // make sure it’s above everything
  },
});

export default Loader;
