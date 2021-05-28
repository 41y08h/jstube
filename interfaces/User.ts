import Subscribers from "./Subscribers";

export default interface User {
  id: number;
  name: string;
  picture: string;
}

export interface Channel extends User {
  subscribers: Subscribers;
}
