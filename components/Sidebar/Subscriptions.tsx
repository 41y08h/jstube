import {
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import Link from "next/link";

const Subscriptions: FC = () => {
  const { data, isLoading, isFetching } = useQuery(
    "/api/subscribers/subscriptions",
    () => axios("/api/subscribers/subscriptions").then((res) => res.data)
  );

  function content() {
    if (isLoading) return <>Loading...</>;
    return (
      <List component="nav">
        {data.map((subscription) => (
          <Link href={`/channel/${subscription.channel.id}`}>
            <a>
              <ListItem button key={subscription.channel.id}>
                <ListItemIcon>
                  <Avatar
                    style={{ height: "32px", width: "32px" }}
                    src={subscription.channel.picture}
                  />
                </ListItemIcon>
                <ListItemText primary={subscription.channel.name} />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    );
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
