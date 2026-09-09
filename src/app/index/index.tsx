
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <TouchableOpacity>
          <MaterialIcons name="add" size={32} color={colors.green[300]}  />
        </TouchableOpacity>
      </View>

      <Categories />

      <FlatList 
        data={["1", "2", "3"]}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Link 
            name={`Example Link ${item}`} 
            url={`https://example.com/${item}`} 
            onDetails={() => console.log(`clicou ${item}`)} 
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>

              <TouchableOpacity>
                <MaterialIcons 
                  name="close" 
                  size={20} 
                  color={colors.gray[400]} 
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>Rockeseat</Text>
            <Text style={styles.modalUrl}>https://example.com/1</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secondary" />
              <Option name="Abrir" icon="language" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

