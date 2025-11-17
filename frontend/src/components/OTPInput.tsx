// components/OTPInput.tsx
import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  rules?: object;
  length?: number; // default 4
}

const OTPInput = ({ control, name, rules = {}, length = 4 }: Props) => {
  const inputs = useRef<TextInput[]>([]);
  const otp = useRef(Array(length).fill(""));

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const str = (value || "").toString();
        const chars = Array.from({ length }).map((_, i) => str[i] ?? "");

        const handleChange = (text: string, index: number) => {
          // create mutable copy of chars
          const next = [...chars];

          if (text.length === 0) {
            // user cleared this box
            next[index] = "";
            onChange(next.join(""));
            return;
          }

          // Support paste/multi-char: fill starting at index
          const incoming = text.split("");
          for (let k = 0; k < incoming.length && index + k < length; k++) {
            next[index + k] = incoming[k];
          }

          onChange(next.join(""));

          // Focus next empty (or the cell after the last filled)
          const nextEmpty = next.findIndex((c, idx) => idx > index && c === "");
          if (nextEmpty !== -1) {
            inputs.current[nextEmpty]?.focus();
          } else {
            const after = Math.min(length - 1, index + incoming.length);
            if (after < length - 1) inputs.current[after + 1]?.focus();
          }
        };

        const handleKeyPress = (e: any, index: number) => {
          if (e.nativeEvent.key === "Backspace") {
            // if current slot is empty, go to previous and clear it
            if (!chars[index] && index > 0) {
              const prev = [...chars];
              prev[index - 1] = "";
              onChange(prev.join(""));
              inputs.current[index - 1]?.focus();
            }
            // if current has value, onChange (from onChangeText) will clear it
          }
        };

        return (
          <>
            <View style={styles.container}>
              {Array.from({ length }).map((_, i) => {
                const isFilled = !!chars[i];
                return (
                  <TextInput
                    key={i}
                    ref={(ref) => { inputs.current[i] = ref!; }}
                    value={chars[i]}
                    style={[
                      styles.input,
                      isFilled && styles.filledInput,
                      error && styles.errorBorder,
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => handleChange(text, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    returnKeyType="done"
                    textContentType="oneTimeCode" // helps iOS autofill
                    autoFocus={i === 0}
                  />
                );
              })}
            </View>
            {error && <Text style={styles.error}>{error.message || "Invalid OTP"}</Text>}
          </>
        );
      }}
    />
  );
};

// ref={(ref) => { inputs.current[i] = ref!; }}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#d0a825",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 17,
    marginBottom:5,
  },
  errorBorder: { 
    borderColor: "red"
   },
  error: { 
    color: "red",
    fontSize: 12,
    marginBottom : 1
    },
  filledInput: {
    backgroundColor: "#d0a82533", // light golden when filled
  },
  // input: {
  //   borderColor: "#d0a825",
  //   borderWidth: 1,
  //   paddingVertical: 15,
  //   paddingHorizontal: 12,
  //   borderRadius: 8,
  //   width: "100%",
  //   marginBottom:15,
  //   color : "black",
  //   fontSize : 17,
  //   fontWeight : 600
  // },
  // errorBorder: {
  //   borderColor: "red",
  // },
  // errorText: {
  //   color: "red",
  //   fontSize: 12,
  //   marginTop: 4,
  // },
});

export default OTPInput;
