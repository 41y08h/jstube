import axios from "axios";

export default async function queryFn({ queryKey }) {
  const { data } = await axios.get(queryKey[0]);
  return data;
}
