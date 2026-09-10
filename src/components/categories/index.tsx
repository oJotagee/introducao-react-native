import { FlatList } from "react-native";

import { Category } from "@/components/category";
import { categories } from "@/utils/categories";
import { styles } from "./styles";

type Props = {
  seleted: string;
  onChange: (category: string) => void;
}

export function Categories({ seleted, onChange }: Props) {
  return (
    <FlatList 
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category 
          name={item.name}
          icon={item.icon}
          isSelected={item.name === seleted}
          onPress={() => onChange(item.name)}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  )
}