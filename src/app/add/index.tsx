import MaterialIcons from "@react-native-vector-icons/material-icons"
import { useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/styles/colors"
import { router } from "expo-router"
import { styles } from "./styles"

import { Button } from "@/components/button"
import { Categories } from "@/components/categories"
import { Input } from "@/components/input"

import { linkStorage } from "@/storage/link-storage"

export default function Add() {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")

  async function handleAdd() {
    try {
      if(!category) {
        Alert.alert("Categoria", "Selecione uma categoria")
        return
      }

      if(!name.trim()) {
        Alert.alert("Nome", "Digite um nome")
        return
      }

      if(!url.trim()) {
        Alert.alert("URL", "Digite uma URL")
        return
      }

      await linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      })

      Alert.alert("Sucesso", "Link adicionado com sucesso", [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ])
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar o link")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>
        Selecione uma categoria
      </Text>
      <Categories seleted={category} onChange={setCategory} />

      <View style={styles.form}>
        <Input 
          placeholder="Nome"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input 
          placeholder="URL"
          value={url}
          onChangeText={setUrl}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  )
}