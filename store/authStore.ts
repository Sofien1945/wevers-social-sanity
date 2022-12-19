import create from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
import { BASE_URL } from "../utils"

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  email: "",

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  setEmail: (mail: string) => set({ email: mail }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`)
    set({ allUsers: response.data })
  },

  createChatRoom: async (doc: any) => {
    const response = await axios.post(`${BASE_URL}/api/chat`, doc)
    console.log(response)
  },

  fetchAllChats: async () => {
    const response = await axios.get(`${BASE_URL}/api/chat`)
    return response
  },

  updateChat: async (doc: any) => {
    const response = await axios.put(`${BASE_URL}/api/chat`, doc)
    return response
  },
})

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
)
export default useAuthStore
