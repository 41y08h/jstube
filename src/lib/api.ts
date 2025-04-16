import axios from 'axios'

export const getVideo = async (videoId: number) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/videos/${videoId}`
  )
  return data
}
