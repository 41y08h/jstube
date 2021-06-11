import { Avatar, LinearProgress } from "@material-ui/core";
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";

const Subscriptions: FC = () => {
  const { data, isLoading, isFetching } = useQuery(
    "/api/subscribers/subscriptions",
    () => axios("/api/subscribers/subscriptions").then((res) => res.data)
  );

  function content() {
    if (isLoading) return <>Loading...</>;
    return data.map((subscription) => (
      <div key={subscription.channel.id} className="flex space-x-4 px-4">
        <Avatar src={subscription.channel.picture} />
        <p>{subscription.channel.name}</p>
      </div>
    ));
  }

  return (
    <div>
      {isFetching && <LinearProgress />}
      <span className="uppercase text-sm font-medium text-secondary px-6">
        Subscriptions
      </span>
      {content()}
    </div>
  );
};

export default Subscriptions;
