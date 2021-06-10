import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";

function WLCard({ data: wl, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function remove() {
    setIsDeleting(true);
    await axios.delete(`/api/watchlater/${wl.video.id}`);
    setIsDeleting(false);
    onDeleted(wl.video.id);
  }

  if (isDeleting) <div>hmm, i'm being deleted</div>;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={wl.video.thumbnail} />
      <Card.Body>
        <Card.Title>{wl.video.title}</Card.Title>
        <Button variant="primary" onClick={remove}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default function WatchLater() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    "/api/watchlater",
    () => axios("/api/watchlater").then((res) => res.data),
    { staleTime: 10000 }
  );

  function handleDelete(videoId) {
    queryClient.setQueryData("/api/watchlater", (old) =>
      old.filter((wl) => wl.video.id !== videoId)
    );
  }

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      {data.map((wl) => (
        <WLCard data={wl} onDeleted={handleDelete} />
      ))}
    </div>
  );
}
