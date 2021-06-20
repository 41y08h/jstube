import { FC, MouseEvent, useState } from "react";
import { useQuery } from "react-query";
import { QVideo } from "../interfaces/Video";
import VideoCard from "../components/VideoCard";

export default function StoryBook() {
  const { data } = useQuery<QVideo[]>("/api/videos");

  return (
    <div className="container mx-auto py-8">
      {data && data[0] && <VideoCard data={data[0]} />}
    </div>
  );
}
