import MaterialIcons from "@react-native-vector-icons/material-icons";
import { ComponentProps } from "react";


type Category = {
  id: string;
  name: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
};

export const categories: Category[] = [
  { id: "1", name: "Projeto", icon: "code" },
  { id: "2", name: "Site", icon: "language" },
  { id: "3", name: "Video", icon: "videocam" },
  { id: "4", name: "Outro", icon: "more-horiz" },
  { id: "5", name: "Artigo", icon: "article" },
];