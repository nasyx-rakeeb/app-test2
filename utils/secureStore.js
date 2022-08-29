import * as SecureStore from "expo-secure-store"

export const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value)
}

export const deleteItem = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    throw new Error(error)
    console.log(error)
  }
}