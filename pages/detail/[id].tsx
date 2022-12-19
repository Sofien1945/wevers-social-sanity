import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { GoVerified } from "react-icons/go"
import Image from "next/image"
import Link from "next/link"
import { MdArrowBackIosNew } from "react-icons/md"
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"

import { Video } from "../../type"
import axios from "axios"
import { BASE_URL } from "../../utils"
import useAuthStore from "../../store/authStore"
import LikeButton from "../../components/LikeButton"
import Comments from "../../components/Comments"
interface IProps {
  postDetails: Video
}

const PostDetail = ({ postDetails }: IProps) => {
  const router = useRouter()
  const { userProfile }: any = useAuthStore()
  const [post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false)
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  //console.log(post)

  const onVideoClick = () => {
    if (videoRef?.current && isPlaying) {
      videoRef?.current.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      })
      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (userProfile) {
      if (comment) {
        setIsPostingComment(true)
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        })
        //console.log(res)

        setPost({ ...post, comments: res.data.comments })
        setComment("")
        setIsPostingComment(false)
      }
    }
  }

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  return (
    <>
      <div className="flex w-full bg-white flex-wrap lg:flex-nowrap just">
        <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black/90 bg-no-repeat bg-cover bg-center">
          <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
            <p className="cursor-pointer " onClick={() => router.back()}>
              <MdArrowBackIosNew className="text-slate-900 text-[35px] hover:opacity-90 bg-white rounded" />
            </p>
          </div>
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video
                src={post?.video?.asset.url}
                ref={videoRef}
                className="h-full cursor-pointer"
                onClick={onVideoClick}
              />
            </div>
            <div className="absolute top-[45%] left-[40%] cursor-pointer bg-gray-500 rounded-xl">
              {!isPlaying && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                </button>
              )}
            </div>
          </div>
          <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer bg-gray-500 rounded">
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
              </button>
            )}
          </div>
        </div>
        <div className="relative w-[1000px] lg:w-[700px]">
          <div className="lg:mt-20 mt-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex gap-4 bg-white w-full pl-10 cursor-pointer">
                <Image
                  width={60}
                  height={60}
                  alt="user-profile"
                  className="rounded-full"
                  src={post.postedBy.image}
                />
                <div>
                  <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-xl" />
                  </div>
                  <p className="text-md text-gray-400">
                    {post.postedBy.userName}
                  </p>
                </div>
              </div>
            </Link>
            <div className="px-10">
              <p className="text-md text-gray-600">{post.caption}</p>
            </div>
            <div className="mt-10 px-10">
              {userProfile && (
                <LikeButton
                  likes={post.likes}
                  flex="flex"
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
              )}
            </div>
            <Comments
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={post.comments}
              isPostingComment={isPostingComment}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data },
  }
}
