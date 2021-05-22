import Subscription from "./Subscription";
import User from "./User";

export default interface Channel extends User {
  subscription: Subscription;
}
