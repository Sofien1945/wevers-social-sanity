import React, { useRef, useState } from "react"
import { RiChatSmile3Line } from "react-icons/ri"
import { BiMailSend } from "react-icons/bi"
import useAuthStore from "../store/authStore"

const LiveChat = () => {
  const { email, setEmail, createChatRoom, fetchAllChats, updateChat } =
    useAuthStore()
  const [showChat, setShowChat] = useState(false)
  const [newChat, setNewChat] = useState(true)
  const [chatId, setChatId] = useState("")
  const [msg, setMsg] = useState([])
  const [sendText, setSendText] = useState("")
  const scroll = useRef()

  const handleSubmitt = async () => {
    const { data } = await fetchAllChats()
    const exist = await data.filter((chat) => {
      return chat.email == email
    })
    if (exist.length > 0) {
      setNewChat(false)
      setChatId(exist[0]._id)
      setMsg(exist[0].messages)
      //console.log(chatId)
    } else {
      const doc = {
        _type: "chat",
        email,
        messages: [],
      }
      createChatRoom(doc)
    }
  }
  const handleChat = async (e) => {
    e.preventDefault()
    const doc = {
      //_type: "chat",
      _id: chatId,
      email,
      message: sendText,
    }
    const { data } = await updateChat(doc)
    scroll?.current?.scrollIntoView({ behavior: "smooth" })
    setSendText("")
    setMsg(data.messages)
    //console.log(msg)
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
          className={`fixed w-[300px] h-[300px] bottom-[75px] md:top-[250px] right-[30px] md:right-24 bg-gray-300 z-10 shadow-secondary p-4 text-center ${
            !showChat ? "-translate-y-[100vh]" : "translate-y-0 rounded "
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
          className={`flex flex-col justify-between fixed w-[300px] h-[300px] bottom-[75px] md:top-[250px] right-[30px] md:right-24 bg-gray-300 z-10 shadow-secondary p-2 ${
            !showChat ? "-translate-y-[100vh]" : "translate-y-0 rounded"
          } transition-all duration-700 shadow-xl shadow-black border border-amber-500`}
        >
          <div className="h-[70vh] p-2 overflow-auto">
            {msg?.map((chat, index) => (
              <div
                key={index}
                className="my-2 py-1 px-2 bg-white rounded-br-xl rounded-tr-xl  text-black w-fit"
              >
                <span ref={scroll}> </span>
                <p>{chat}</p>
                <span ref={scroll}> </span>
              </div>
            ))}
            <br />
          </div>
          <div className="flex lg:w-[47vh] lg:h-[10vh] mt-2 rounded-md items-center ">
            <input
              type="text"
              className="w-[40vh] mr-2 rounded border border-amber-500 px-2"
              value={sendText}
              onChange={(e) => setSendText(e.target.value)}
            />
            <BiMailSend
              size={25}
              className="hover:bg-gray-500 rounded"
              onClick={handleChat}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default LiveChat
