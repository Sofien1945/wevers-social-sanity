import React, { useState, useEffect, useRef } from "react"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs"
import { GoVerified } from "react-icons/go"
import { Video } from "../type"

interface IProps {
  post: Video
  isShowingOnHome?: boolean
}
const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
  isShowingOnHome,
}) => {
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  //console.log(caption)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  return (
    <div className="flex flex-col border-b-2 border-gray-200 p-2">
      <div>
        <div className="flex gap-3 cursor-pointer font-semibold rounded">
          <div className="md:w-16 w-10 h-10">
            <Link href={`/profile/${postedBy?._id}`}>
              <Image
                src={postedBy?.image}
                width={62}
                height={62}
                alt="userProfile"
                layout="responsive"
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {postedBy.userName}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className="mt-2 font-normal">{caption}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex relative flex-col items-center">
        <Link href={`/detail/${_id}`}>
          <video
            src={video.asset.url}
            loop
            ref={videoRef}
            className="w-full lg:w-[600px] h-fit md:h-[400px] lg:h-[450px] rounded-xl cursor-pointer"
          />
        </Link>

        <div className="cursor-pointer left-8 md:left-14 lg:left-0 flex justify-between w-full px-12">
          {playing ? (
            <button onClick={onVideoPress}>
              <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={onVideoPress}>
              <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
            </button>
          )}
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
