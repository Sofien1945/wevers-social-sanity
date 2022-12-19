import React, { useState } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import GoogleLogin from "react-google-login"
import { AiFillHome, AiOutlineMenu } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import Discover from "../components/Discover"
import SuggestedAccounts from "../components/SuggestedAccounts"
import Footer from "../components/Footer"
import useAuthStore from "../store/authStore"

const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const { pathname } = useRouter()
  const [userProfile, setUserProfile] = useState(false)
  const { fetchAllUsers, allUsers } = useAuthStore()
  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-amber-500 rounded-full bg-gray-300"

  const normalLink =
    "flex items-center gap-3 bg-none hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded"
  return (
    <div className="h-full overflow-scroll">
      <div
        className="flex justify-center xl:hidden m-2 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-[300px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === "/" ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span
                  className={`capitalize text-2xl hidden xl:block ${
                    pathname === "/" &&
                    "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-600"
                  }`}
                >
                  Welcome
                </span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
