import axios from 'axios'

export default function fetcher(url: string) {
  return axios.get(url).then(res => res.data)
}
