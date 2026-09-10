import AsyncStorage from '@react-native-async-storage/async-storage';

const LINK_STORAGE_KEY = 'links-storage';

export type LinkStorage = {
  id: string;
  name: string;
  url: string;
  category: string;
}

async function get(): Promise<LinkStorage[]> {
  const storedLinks = await AsyncStorage.getItem(LINK_STORAGE_KEY);

  return storedLinks ? JSON.parse(storedLinks) : [];
}

async function save(newLinks: LinkStorage): Promise<void> {
  try {
    const existingLinks = await get();
    const updatedLinks = [...existingLinks, newLinks];

    await AsyncStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(updatedLinks));
  } catch (error) {
    throw error;
  }
}

async function remove(id: string): Promise<void> {
  try {
    const existingLinks = await get();
    const filteredLinks = existingLinks.filter(link => link.id !== id);

    await AsyncStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(filteredLinks));
  } catch (error) {
    throw error;
  }
}

export const linkStorage = {
  get,
  save,
  remove,
};