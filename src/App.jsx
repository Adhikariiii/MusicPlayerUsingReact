import React from "react";
import { useState, useRef } from "react";

//Ui
import { Typography, Card, Button, Paper } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

//css
import "./App.css";

//songs
import pinkflyod from "./assets/audios/pinkflyod.mp3";

// songs array
import audio from "./audio";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [playlist, setPlaylist] = useState(audio);
  const audioRef = useRef(null);

  const toggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };
  const togglePlayList = () => {
    setVisible(!visible);
  };
  const onHandleAdd = (e) => {
    const files = Array.from(e.target.files);
    const newSongs = files.map((file) => ({
      title: file.name,
      src: URL.createObjectURL(file),
      img: "default",
    }));
    setPlaylist((prevPlaylist) => [...prevPlaylist, ...newSongs]);
  };
  return (
    <>
      <Typography variant="h2" color="secondary" align="center">
        Music Player
      </Typography>
      <Typography variant="h4">
        You're currently Playing {playlist.title}
      </Typography>
      <div className="container">
        <div className="musicPlayer">
          <Card className="card">
            {/* <img src="fjalsd" alt="photo" /> */}
            <br />
            <Typography
              variant="h6"
              color="textSecondary"
              alignContent={"center"}
              m={2}
            >
              {playlist[currentIndex].title}
            </Typography>
            <audio
              src={playlist[currentIndex].src}
              ref={audioRef}
              onTimeUpdate={(e) => {
                setCurrentTime(e.target.currentTime);
              }}
              onLoadedMetadata={(e) => {
                setDuration(e.target.duration);
              }}
            />
            <input
              type="range"
              value={currentTime}
              min="0"
              max={duration}
              onChange={(e) => {
                const newTime = parseFloat(e.target.value);
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
                console.log(newTime);
              }}
            />
            {Math.floor(currentTime / 60)}:
            {String(Math.floor(currentTime % 60)).padStart(2, "0")}
            <div className="controllers">
              <SkipPreviousIcon onClick={handlePrevious} />

              {isPlaying ? (
                <PauseIcon onClick={toggle} />
              ) : (
                <PlayArrowIcon onClick={toggle} />
              )}
              <SkipNextIcon onClick={handleNext} />
            </div>
          </Card>
        </div>
        <div className="playlist">
          <Button onClick={togglePlayList} variant="contained">
            {visible ? "Hide Playlist" : "Show Playlist"}
          </Button>
          {visible && (
            <Paper elevation={8} variant="outlined">
              {playlist.map((songs, index) => {
                return (
                  <div className="songList" key={index}>
                    <a href="#"> {songs.title}</a>
                    <br></br>
                  </div>
                );
              })}
            </Paper>
          )}
        </div>
        <div className="addsongs">
          <input
            type="file"
            className="input_add"
            accept="audio/*"
            multiple
            onChange={onHandleAdd}
          />
          <Button variant="contained" color="success">
            Add Songs
          </Button>
        </div>
      </div>
    </>
  );
}
