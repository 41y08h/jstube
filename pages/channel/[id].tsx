import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ChannelTabs from "../../components/ChannelTabs";
import { useQuery } from "react-query";
import { FC } from "react";
import IVideo from "../../interfaces/Video";
import Link from "next/link";

const Videos: FC<{ channelId: number }> = ({ channelId }) => {
  const { data, isLoading } = useQuery<IVideo[]>(
    `/api/channel/${channelId}/videos`
  );

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {data?.map((video) => (
        <Card style={{ width: "13rem" }} variant="outlined">
          <CardActionArea>
            <Link href={`/watch?v=${video.id}`}>
              <a>
                <CardMedia
                  component="img"
                  image={video.thumbnail}
                  alt={video.title}
                  height="140"
                  title={video.title}
                />
              </a>
            </Link>
            <p className="font-medium p-2">{video.title}</p>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default function ChannelPage({ channel }) {
  return (
    <div>
      <img
        src="https://source.unsplash.com/1600x250/?nature,water"
        alt="nature"
      />
      <div className="flex justify-between items-center w-full p-4">
        <div className="flex space-x-4">
          <Avatar
            src={channel.picture}
            alt={channel.name}
            style={{ width: "75px", height: "75px" }}
          />
          <div>
            <p className="text-xl">{channel.name}</p>
            <p className="text-md text-secondary">
              {channel.subscribers.count} subscribers
            </p>
          </div>
        </div>
        <Button variant="contained" color="secondary" disableElevation>
          Subscribe
        </Button>
      </div>
      <ChannelTabs />
      <Videos channelId={channel.id} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const channelId = ctx.params?.id;
  const { data } = await axios(`http://localhost:5000/channel/${channelId}`);
  return { props: { channel: data } };
};
