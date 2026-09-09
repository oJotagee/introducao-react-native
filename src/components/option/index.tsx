import { colors } from "@/styles/colors";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { ComponentProps } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  name: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  variant?: "primary" | "secondary";
};

export function Option({ name, icon, variant = "primary", ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <MaterialIcons 
        name={icon} 
        size={20}
        color={variant === "primary" ? colors.green[300] : colors.gray[300]}  
      />

      <Text style={variant === "primary" ? styles.primaryTitle : styles.secondaryTitle}>{name}</Text>
    </TouchableOpacity>
  )
}