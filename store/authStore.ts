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

  sendEmail: async (mail: string) => {
    const response = await axios.post(`${BASE_URL}/api/chat`, { email: mail })
    console.log(response)
  },
})

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
)
export default useAuthStore
