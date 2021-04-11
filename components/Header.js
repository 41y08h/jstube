import { Typography } from "@material-ui/core";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Typography component="a" variant="h3">
          JS Tube
        </Typography>
      </Link>
    </header>
  );
}
