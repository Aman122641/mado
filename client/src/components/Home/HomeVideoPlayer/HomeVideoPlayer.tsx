import React from "react";
import { Avatar } from "@mui/joy";

import VideoControls from "../../VideoControls/VideoControls";
import { useSocketContext } from "../../../hooks/useSocketContext";
import useStyles from "./styles";

const HomeVideoPlayer = () => {
  const classes = useStyles();

  const { myVideo, isVideo, stream } = useSocketContext();

  return (
    <>
      {stream && (
        <div className={classes.videoContainer}>
          <div className={classes.avatar}>
            <Avatar
              sx={{
                "--Avatar-size": "80px",
              }}
            />
          </div>
          {isVideo && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          )}
          <div className={classes.videoControls}>
            <VideoControls />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeVideoPlayer;
