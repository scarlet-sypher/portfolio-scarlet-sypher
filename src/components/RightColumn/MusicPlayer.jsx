import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Repeat,
  Shuffle,
} from "lucide-react";

import track1 from "../../assets/music/Alex Warren - Ordinary.mp3";
import track2 from "../../assets/music/She   Him - I Thought I Saw Your Face Today.mp3";

const SONGS = [
  {
    src: track1,
    title: "Ordinary",
    artist: "Alex Warren",
  },
  {
    src: track2,
    title: "I Thought I Saw Your Face Today",
    artist: "She & Him",
  },
];

function fmt(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${sec}`;
}

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const song = SONGS[idx];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      }
    };
    const onEnded = () => handleEnded();

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, isRepeat, isShuffle, idx]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) audio.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  const handleEnded = useCallback(() => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    if (isShuffle) {
      const next = Math.floor(Math.random() * SONGS.length);
      setIdx(next);
    } else {
      setIdx((i) => (i + 1) % SONGS.length);
    }
  }, [isRepeat, isShuffle]);

  const togglePlay = () => setIsPlaying((p) => !p);

  const skipBack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setIdx((i) => (i - 1 + SONGS.length) % SONGS.length);
    }
  };

  const skipForward = () => {
    if (isShuffle) {
      setIdx(Math.floor(Math.random() * SONGS.length));
    } else {
      setIdx((i) => (i + 1) % SONGS.length);
    }
  };

  const seekBarRef = useRef(null);

  const calcSeek = (e) => {
    const bar = seekBarRef.current;
    if (!bar) return;
    const { left, width } = bar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.min(Math.max((clientX - left) / width, 0), 1);
    setProgress(ratio * 100);
    setCurrentTime(ratio * duration);
    if (audioRef.current) audioRef.current.currentTime = ratio * duration;
  };

  const onSeekStart = (e) => {
    setIsDragging(true);
    calcSeek(e);
  };
  const onSeekMove = (e) => {
    if (isDragging) calcSeek(e);
  };
  const onSeekEnd = () => setIsDragging(false);

  return (
    <>
      <audio ref={audioRef} src={song.src} preload="metadata" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 10,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div style={{ overflow: "hidden", maxWidth: "80%" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {song.title}
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                marginTop: 2,
                color: "rgba(255,255,255,0.3)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {song.artist}
            </div>
          </div>

          <motion.button
            onClick={() => setIsLiked((p) => !p)}
            whileTap={{ scale: 0.8 }}
          >
            <Heart
              size={13}
              style={{
                fill: isLiked ? "#fb923c" : "transparent",
                color: isLiked ? "#fb923c" : "rgba(255,255,255,0.25)",
                transition: "all 0.2s",
              }}
            />
          </motion.button>
        </div>

        <div
          ref={seekBarRef}
          className="w-full rounded-full mb-1 cursor-pointer"
          style={{
            height: 5,
            background: "rgba(255,255,255,0.1)",
            position: "relative",
          }}
          onMouseDown={onSeekStart}
          onMouseMove={onSeekMove}
          onMouseUp={onSeekEnd}
          onMouseLeave={onSeekEnd}
          onTouchStart={onSeekStart}
          onTouchMove={onSeekMove}
          onTouchEnd={onSeekEnd}
        >
          <div
            className="rounded-full"
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "rgba(255,155,50,0.9)",
              transition: isDragging ? "none" : "width 0.1s linear",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -4,
                top: "50%",
                transform: "translateY(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ffb050",
                opacity: isDragging ? 1 : 0,
                transition: "opacity 0.15s",
              }}
            />
          </div>
        </div>

        <div
          className="flex justify-between mb-2"
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => setIsRepeat((p) => !p)}
            className="transition-opacity"
            style={{ opacity: isRepeat ? 0.85 : 0.25 }}
            whileTap={{ scale: 0.85 }}
            title="Repeat"
          >
            <Repeat
              size={11}
              style={{ color: isRepeat ? "#fb923c" : "inherit" }}
            />
          </motion.button>

          <motion.button
            className="opacity-45 hover:opacity-85 transition-opacity"
            whileTap={{ scale: 0.85 }}
            onClick={skipBack}
            title="Previous / Restart"
          >
            <SkipBack size={13} />
          </motion.button>

          <motion.button
            onClick={togglePlay}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 30,
              height: 30,
              background: "rgba(255,145,40,0.85)",
              border: "1px solid rgba(255,180,80,0.4)",
              color: "#fff",
            }}
            whileHover={{ scale: 1.1, background: "rgba(255,160,55,0.95)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            {isPlaying ? (
              <Pause size={12} />
            ) : (
              <Play size={12} className="ml-px" />
            )}
          </motion.button>

          <motion.button
            className="opacity-45 hover:opacity-85 transition-opacity"
            whileTap={{ scale: 0.85 }}
            onClick={skipForward}
            title="Next"
          >
            <SkipForward size={13} />
          </motion.button>

          <motion.button
            onClick={() => setIsShuffle((p) => !p)}
            className="transition-opacity"
            style={{ opacity: isShuffle ? 0.85 : 0.25 }}
            whileTap={{ scale: 0.85 }}
            title="Shuffle"
          >
            <Shuffle
              size={11}
              style={{ color: isShuffle ? "#fb923c" : "inherit" }}
            />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
