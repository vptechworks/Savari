// components/FormInput.tsx
import React,{useRef} from "react";
import { Controller , Control , FieldValues,Path } from "react-hook-form";
import { TextInput, Text, View, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  rules?: object;
  secureTextEntry?: boolean;
  type?: "text" | "phone";
}

const FormInput = <T extends FieldValues>({ name, control, placeholder, rules, secureTextEntry,type="text" }: Props<T>) => {
  const phoneInput = useRef<PhoneInput | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        ...(type === "phone" && {
          validate: (value: string) => {
            if (!phoneInput.current?.isValidNumber(value)) {
              return "Invalid phone number";
            }
            return true;
          },
        }),
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {type === "phone" ? (
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              layout="second"
              onChangeFormattedText={onChange}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textContainer}
              textInputStyle={styles.textInput}
              codeTextStyle={styles.codeText}
              flagButtonStyle={styles.flagButton}
            />
          ) : (
            <TextInput
              placeholder={placeholder}
              style={[styles.input, error && styles.errorBorder]}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
            />
          )}

          {error && <Text style={styles.errorText}>{error.message || "Error"}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  input: {
    borderColor: "#d0a825",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom:15,
    color : "black",
    fontSize : 17,
    fontWeight : 600
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  phoneContainer: {
  width: "100%",
  height: 55,
  borderWidth: 1,
  borderColor: "#d0a825",
  borderRadius: 8,
  marginBottom: 15,
  overflow: "hidden", // important to keep flag inside border
},
textContainer: {
  paddingVertical: 0,
  backgroundColor: "transparent", // remove default gray
},
textInput: {
    color : "black",
    fontSize : 17,
    fontWeight : 600
  },
codeText: {
    fontSize: 17,
    color: "black",
    fontWeight: "600",
  },
  flagButton: {
    backgroundColor: "#d0a825",
  },
});

export default FormInput;
