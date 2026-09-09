import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import type { ComponentProps } from "react";
import { Pressable, PressableProps, Text } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

type CategoryProps = PressableProps & {
  name: string;
  isSelected: boolean;
  icon: ComponentProps<typeof MaterialIcons>["name"];
}

export function Category({ name, icon, isSelected, ...rest }: CategoryProps) {
  const color = isSelected ? colors.green[300] : colors.gray[400];

  return (
    <>
      <Pressable style={styles.container} {...rest}>
        <MaterialIcons name={icon} size={16} color={color} />
        <Text style={[styles.name, { color }]}>{name}</Text>
      </Pressable>
    </>
  )  
}