import type { NextPage } from "next"
import axios from "axios"
import { Video } from "../type"
import VideoCard from "../components/VideoCard"
import NoResults from "../components/NoResults"
import { BASE_URL } from "../utils"

interface IProps {
  videos: Video[]
}

const Home: NextPage<IProps> = ({ videos }) => {
  //console.log(videos)
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} key={video._id} isShowingOnHome />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  )
}

export default Home

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string }
}) => {
  let response = await axios.get("http://localhost:3000/api/post")
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }
  return {
    props: { videos: response.data },
  }
}
