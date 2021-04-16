import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 0,
    boxShadow: "none",
    color: "#606060",
  },
  title: {
    fontWeight: 400,
    fontSize: "1rem",
  },
});

export default function VideoCard({ data }) {
  const classes = useStyles();

  return (
    <Link href={`/watch/${data.id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={data.title}
            height="154"
            image={data.thumb}
            title={data.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              className={classes.title}
              variant="p"
              component="h2"
            >
              {data.title}
            </Typography>
            <Typography>{data.subtitle}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
