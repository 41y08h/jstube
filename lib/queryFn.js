import axios from "axios";

export default async function queryFn({ queryKey }) {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://jstube-api.herokuapp.com";

  const { data } = await axios.get(queryKey[0], {
    baseURL,
    withCredentials: true,
  });
  return data;
}
