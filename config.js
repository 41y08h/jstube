const isDevEnvironment = process.env.NODE_ENV === "development";

export const API_URL = isDevEnvironment
  ? "http://localhost:5000"
  : "https://jstube-api.herokuapp.com";
