import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import { LinearProgress } from "@material-ui/core";

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
  const { data, isLoading, isFetching } = useQuery("/api/watchlater", () =>
    axios("/api/watchlater").then((res) => res.data)
  );

  function handleDelete(videoId) {
    queryClient.setQueryData("/api/watchlater", (old) =>
      old.filter((wl) => wl.video.id !== videoId)
    );
  }

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      {isFetching && <LinearProgress />}
      <Link href="/">back</Link>
      {data.map((wl) => (
        <WLCard data={wl} onDeleted={handleDelete} />
      ))}
    </div>
  );
}
