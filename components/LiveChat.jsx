import axios from "axios"
import React, { useState } from "react"
import { RiChatSmile3Line } from "react-icons/ri"
import { BASE_URL } from "../utils"
import useAuthStore from "../store/authStore"

const LiveChat = () => {
  const { email, setEmail, sendEmail } = useAuthStore()
  const [showChat, setShowChat] = useState(false)
  const [newChat, setNewChat] = useState(true)

  const handleSubmitt = async () => {
    setNewChat(false)
    sendEmail(email)
    // const res = await axios.put(`${BASE_URL}/api/chat`, {
    //   email: email,
    // })
  }
  return (
    <>
      <div
        className="fixed bottom-4 right-6 z-10 bg-amber-500 rounded-full p-2 text-3xl hover:bg-slate-800"
        onClick={() => setShowChat((prev) => !prev)}
      >
        <RiChatSmile3Line color="white" />
      </div>

      {newChat ? (
        <div
          className={`absolute w-[300px] h-[300px] top-[500px] md:top-[250px] right-16 md:right-24 bg-gray-300 z-10 shadow-secondary p-4 ${
            !showChat
              ? "-translate-y-[100vh]"
              : "translate-y-0 rounded text-center"
          } transition-all duration-700`}
        >
          <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to Live Chat
          </h1>
          <h4 className="font-semibold m-2">
            Please Write your E-mail address
          </h4>
          <input
            type="email"
            className="bg-white rounded shadow-sm p-2 w-64 mt-8"
            placeholder="e-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && (
            <button
              className="bg-amber-500 px-4 py-2 rounded m-8 hover:bg-slate-600 text-semibold text-white"
              onClick={handleSubmitt}
            >
              Submitt
            </button>
          )}
        </div>
      ) : (
        <div
          className={`fixed w-[300px] h-[300px] bottom-[75px] md:top-[250px] right-[30px] md:right-24 bg-gray-300 z-10 shadow-secondary p-4 ${
            !showChat
              ? "-translate-y-[100vh]"
              : "translate-y-0 rounded text-center"
          } transition-all duration-700`}
        >
          empty
        </div>
      )}
    </>
  )
}

export default LiveChat
