import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { EyeIcon } from "../../../assets/Eye.icon";
import { BlindIcon } from "../../../assets/Blind.icon";

export type StyledTextInputProps = TextInputProps & {
  value: string;
  label?: string;
  isPassword?: boolean;
  focusOnRender?: boolean;
  onChangeText?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  helperText?: string;
};

export const StyledTextInput: React.FC<StyledTextInputProps> = ({
  value,
  label,
  isPassword,
  focusOnRender,
  onChangeText,
  helperText,
  ...rest
}) => {
  const styles = getStyles();
  const [showPassword, setShowPassword] = useState(false);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (focusOnRender && textInputRef.current) textInputRef.current.focus();
  }, []);

  return (
    <View style={styles.wrapper}>
      {value.length > 0 && <Text style={styles.label}>{label}</Text>}
      <View style={{ ...styles.textArea, marginTop: value.length ? 0 : 19 }}>
        <TextInput
          style={[styles.input, { paddingTop: value.length ? 5 : 0 }]}
          placeholder={label}
          placeholderTextColor="black"
          secureTextEntry={isPassword && !showPassword}
          ref={textInputRef}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeIcon /> : <BlindIcon />}
          </TouchableOpacity>
        )}
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    wrapper: {
      // borderWidth: 1,
      // borderColor: "#909090",
      // borderRadius: 8,
      paddingHorizontal: 20,
    },
    label: {
      color: "#5c5c5c",
    },
    textArea: {
      flexDirection: "row",
    },
    input: {
      fontSize: 26,
      padding: 0,
      paddingBottom: 16,
      flex: 1,
    },
    helperText: {
      color: "red",
    },
  });
};
