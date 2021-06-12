import Link from "next/link";
import { useQuery } from "react-query";
import { LinearProgress } from "@material-ui/core";

export default function History() {
  const { data, isLoading, isFetching } = useQuery("/api/history");

  if (isLoading) return <>...</>;

  return (
    <div>
      {isFetching && <LinearProgress />}
      <Link href="/">back</Link>
      {data.map((history) => (
        <p>{history.video.title}</p>
      ))}
    </div>
  );
}
