import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import formatTime from "../lib/formatTime";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 0,
    boxShadow: "none",
    color: "#606060",
    width: "fit-content",
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: 500,
    fontSize: "0.9rem",
    lineHeight: "2rem",
    maxHeight: "4rem",
    color: "#030303",
    padding: 0,
    margin: 0,
  },
  thumbWrapper: {
    position: "relative",
  },
  thumb: {
    width: 243,
    height: 136,
    objectFit: "cover",
  },
  duration: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#232319",
    color: "#fff",
    zIndex: 2,
    padding: "3px 4px",
    borderRadius: 4,
    fontSize: "0.75rem",
  },
  infoWrapper: {
    padding: "8px 0",
    paddingBottom: 0,
  },
  infoTop: {
    display: "flex",
  },
});

export default function VideoCard({ data }) {
  const classes = useStyles();

  return (
    <Link href={`/watch/${data.id}`}>
      <Card className={classes.root}>
        <div>
          <div className={classes.thumbWrapper}>
            <CardMedia
              component="img"
              alt={data.title}
              height="154"
              image={data.thumb}
              title={data.title}
              className={classes.thumb}
            />
            <Typography className={classes.duration}>
              {formatTime(data.duration)}
            </Typography>
          </div>
          <CardContent className={classes.infoWrapper}>
            <div className={classes.infoTop}>
              <Avatar>{data.subtitle.substring(0, 1)}</Avatar>
              <Typography
                gutterBottom
                className={classes.title}
                variant="p"
                component="h2"
              >
                {data.title}
              </Typography>
            </div>
            <Typography>{data.subtitle}</Typography>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
