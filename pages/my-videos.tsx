import { LinearProgress } from "@material-ui/core";
import { useQuery } from "react-query";
import { Card } from "react-bootstrap";
import Link from "next/link";

function VideoCard({ data: video }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={video.thumbnail} />
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default function MyVideos() {
  const { data, isLoading, isFetching } = useQuery("/api/videos/mine");

  if (isLoading) return <>...</>;
  return (
    <div>
      {isFetching && <LinearProgress />}
      <Link href="/">back</Link>
      {data.map((video) => (
        <VideoCard data={video} />
      ))}
    </div>
  );
}
