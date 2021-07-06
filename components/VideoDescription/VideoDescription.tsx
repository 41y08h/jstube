import { FC, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    paddingLeft: 0,
    marginTop: "1rem",
  },
});

interface Props {
  text: string;
}

const VideoDescription: FC<Props> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  const shortLength = 160;
  return (
    <div>
      <Typography variant="body2">
        {isExpanded ? text : text.substring(0, shortLength + 1)}
      </Typography>
      <Button
        onClick={() => setIsExpanded((prev) => !prev)}
        color="secondary"
        className={classes.button}
      >
        Show {isExpanded ? "less" : "more"}
      </Button>
    </div>
  );
};

export default VideoDescription;
