import axios from "axios";

export default function fetcher(url, options) {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://jstube-api.herokuapp.com";

  return axios
    .get(url, { baseURL, withCredentials: true, ...options })
    .then((res) => res.data);
}
