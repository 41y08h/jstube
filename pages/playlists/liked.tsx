import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

function VideoCard({ data: video, onDeleted }) {
  const deleteMutation = useMutation(
    () => axios.delete(`/api/ratings/videos/${video.id}`),
    { onSuccess: () => onDeleted(video.id) }
  );

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={video.thumbnail} />
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <Button variant="primary" onClick={deleteMutation.mutate}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default function Liked() {
  const { data, isLoading, isFetching } = useQuery("/api/playlists/liked");
  const queryClient = useQueryClient();

  function handleDeleted(id: number) {
    queryClient.setQueryData("/api/playlists/liked", (data) =>
      data.filter((video) => video.id !== id)
    );
  }

  if (isLoading) return <>...</>;

  return (
    <>
      {isFetching && <LinearProgress />}
      <Link href="/">back</Link>
      {data?.map((video) => (
        <VideoCard data={video} onDeleted={handleDeleted} />
      ))}
    </>
  );
}
