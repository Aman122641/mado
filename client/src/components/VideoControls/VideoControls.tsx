import React from "react";
import { Grid } from "@material-ui/core";
import { IconButton } from "@mui/joy";
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";

import { useSocketContext } from "../../hooks/useSocketContext";

import useStyles from "./styles";

const VideoControls = (): JSX.Element => {
  const classes = useStyles();

  const {
    stream,
    isAudio,
    setIsAudio,
    isVideo,
    setIsVideo,
    isCallerMuted,
    setIsCallerMuted,
    leaveCall,
    joinedRoom,
  } = useSocketContext();

  const handleAudio = (): void => {
    stream!.getAudioTracks()[0].enabled = !isAudio;
    setIsAudio((prevAudio) => !prevAudio);
  };

  const handleVideo = (): void => {
    stream!.getVideoTracks()[0].enabled = !isVideo;
    setIsVideo((prevVideo) => !prevVideo);
  };

  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      {stream && isVideo ? (
        <Grid item>
          <IconButton
            aria-label="Turn video camera off"
            variant="solid"
            color="primary"
            size="lg"
            onClick={handleVideo}
          >
            <Videocam />
          </IconButton>
        </Grid>
      ) : (
        <Grid item>
          <IconButton
            aria-label="Turn video camera on"
            variant="solid"
            color="danger"
            size="lg"
            onClick={handleVideo}
          >
            <VideocamOff />
          </IconButton>
        </Grid>
      )}
      {stream && isAudio ? (
        <Grid item>
          <IconButton
            aria-label="Turn mic off"
            variant="solid"
            color="primary"
            size="lg"
            onClick={handleAudio}
          >
            <Mic />
          </IconButton>
        </Grid>
      ) : (
        <Grid item>
          <IconButton
            aria-label="Turn mic on"
            variant="solid"
            color="danger"
            size="lg"
            onClick={handleAudio}
          >
            <MicOff />
          </IconButton>
        </Grid>
      )}
      {joinedRoom && (
        <>
          <Grid item>
            <IconButton
              aria-label="Mute Call"
              variant="solid"
              size="lg"
              color={isCallerMuted ? "danger" : "primary"}
              onClick={() =>
                setIsCallerMuted((isCallerMuted) => !isCallerMuted)
              }
            >
              {isCallerMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Hang Up"
              variant="solid"
              color="danger"
              size="lg"
              onClick={leaveCall}
            >
              <CallEnd />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default VideoControls;
