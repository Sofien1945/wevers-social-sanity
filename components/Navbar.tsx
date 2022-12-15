import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import Logo from "../utils/logo-weavers.png"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { IUser } from "../type"
import { createOrGetUser } from "../utils"
import useAuthStore from "../store/authStore"

const Navbar = () => {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>()
  const [searchValue, setSearchValue] = useState("")
  const { userProfile, addUser, removeUser } = useAuthStore()

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  const handleSearch = (e: any) => {
    e.preventDefault()
    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[45px] md:w-[50px] md:h-[50px] h-[45px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            layout="responsive"
            alt="weavers"
          />
        </div>
      </Link>
      <div className="relative hidden md:block xl:-left-48">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[200px] md:w-[350px] rounded-md md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10 p-1">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded hover:bg-cyan-100">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div className="flex items-center ">
                  <Image
                    src={user?.image}
                    className="rounded-full cursor-pointer shadow-md m-1"
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <button
              className="border-b-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser)
            }}
            onError={() => {
              console.log("error")
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
