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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % audio.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? audio.length - 1 : prevIndex - 1
    );
  };
  const togglePlayList = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="container">
        <div className="musicPlayer">
          <Typography variant="h2">Music Player</Typography>
          <Card>
            {/* <img src="fjalsd" alt="photo" /> */}
            <br />
            <Typography>{audio[currentIndex].title}</Typography>
            <audio
              src={audio[currentIndex].src}
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
          <Button onClick={togglePlayList}>
            {visible ? "Hide Playlist" : "Show Playlist"}
          </Button>
          {visible && (
            <Paper elevation={8} variant="outlined">
              {audio.map((songs, index) => {
                return (
                  <div className="songList" key={index}>
                    {songs.title}
                    <br></br>
                  </div>
                );
              })}
            </Paper>
          )}
        </div>
      </div>
    </>
  );
}
