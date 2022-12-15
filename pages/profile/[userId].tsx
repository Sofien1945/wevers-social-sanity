import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { BASE_URL } from "../../utils"
import { IUser, Video } from "../../type"
import Image from "next/image"
import { GoVerified } from "react-icons/go"
import NoResults from "../../components/NoResults"
import VideoCard from "../../components/VideoCard"

interface IProps {
  data: {
    user: IUser
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true)
  const [videosList, setVideosList] = useState<Video[]>([])
  const router = useRouter()
  const { user, userVideos, userLikedVideos } = data
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400"
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400"

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos)
      } else {
        setVideosList(userLikedVideos)
      }
    }

    fetchVideos()
  }, [showUserVideos, userLikedVideos, userVideos])

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 w-full items-center p-4 rounded bg-gradient-to-br from-orange-400 to-orange-100">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>
        <div>
          <div className=" text-xl md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center capitalize">
            <span>{user.userName} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </div>
          <p className="text-sm font-medium"> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 bordre-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`)
  return {
    props: { data: res.data },
  }
}
