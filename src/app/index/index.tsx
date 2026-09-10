
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Image, Linking, Modal, Text, TouchableOpacity, View } from "react-native";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { LinkStorage, linkStorage } from "@/storage/link-storage";
import { categories } from "@/utils/categories";

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
  const [category, setCategory] = useState(categories[0].name)
  const [links, setLinks] = useState<LinkStorage[]>([])

  async function getLinks() {
    try {
      const response = await linkStorage.get();

      const filtered = response.filter((link) => link.category === category)

      setLinks(filtered);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os links");
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true)
    setLink(selected)
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id);

      setShowModal(false);

      getLinks();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao remover o link");
    }
  } 

  function handleRemove() {
    Alert.alert("Excluir", "Deseja realmente excluir este link?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: linkRemove }
    ])
  }

  async function handleOpen() {
    try {
      const supported = await Linking.canOpenURL(link.url);

      if (supported) {
        await Linking.openURL(link.url);
        setShowModal(false);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o link");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao abrir o link");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]}  />
        </TouchableOpacity>
      </View>

      <Categories seleted={category} onChange={setCategory} />

      <FlatList 
        data={links} 
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Link 
            name={item.name} 
            url={item.url} 
            onDetails={() => handleDetails(item)} 
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{category}</Text>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons 
                  name="close" 
                  size={20} 
                  color={colors.gray[400]} 
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove} />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

