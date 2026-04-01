import { useState } from "react";
import GearLoader from "./components/GearLoader";
import LeftSidebar from "./components/LeftSidebar";
import MainPanel from "./components/MainPanel";
import HeroCharacter from "./components/HeroCharacter";
import Dock from "./components/Dock";

// ── background ──────────────────────────────────────────────
import backgroundImage from "./assets/bg.png";

// ── hero ────────────────────────────────────────────────────
import cat from "./assets/hero/cat.png";
import deku from "./assets/hero/deku.png";
import fire from "./assets/hero/fire.png";
import inoske from "./assets/hero/inoske.png";
import jinbe from "./assets/hero/jinbe.png";
import killua from "./assets/hero/killua.png";
import luffy from "./assets/hero/luffy.png";
import luffy2 from "./assets/hero/luffy2.png";
import luffy3 from "./assets/hero/luffy3.png";
import naruto from "./assets/hero/naruto.png";
import rengoku from "./assets/hero/rengoku.png";
import zoro from "./assets/hero/zoro.png";

// ── about ───────────────────────────────────────────────────
import aboutBig from "./assets/about/big.jpeg";
import aboutSmall from "./assets/about/small.jpeg";

// ── contact ─────────────────────────────────────────────────
import contactPhoto from "./assets/contact/ec03ee5eddd020f2279b17f0ca754969.jpg";
import contactHandshake from "./assets/contact/handshake.png";

// ── education ───────────────────────────────────────────────
import collegeLpu from "./assets/education/college-lpu.png";
import college from "./assets/education/college.png";
import schoolKv from "./assets/education/school-kv.png";
import eduTen from "./assets/education/ten.png";
import eduTwl from "./assets/education/twl.png";

// ── home ────────────────────────────────────────────────────
import homeGreen from "./assets/home/green.png";
import homeRed from "./assets/home/red.png";
import homeWhite from "./assets/home/white.png";

// ── projects ────────────────────────────────────────────────
import crybug from "./assets/projects/crybug.png";
import devflow from "./assets/projects/devflow.png";
import helpmemake from "./assets/projects/helpmemake.png";
import podcast from "./assets/projects/podcast.png";
import whispherTails from "./assets/projects/whispherTails.png";

// ── tech / anime ────────────────────────────────────────────
import techAurther from "./assets/tech/anime/aurther.png";
import techGobi from "./assets/tech/anime/gobi.png";
import techNaruto from "./assets/tech/anime/naruto.png";
import techNezuko from "./assets/tech/anime/nezuko.png";
import techRengoku from "./assets/tech/anime/rengoku.png";
import techSanji from "./assets/tech/anime/sanji.png";
import techToiji from "./assets/tech/anime/toiji.png";
import techZenetsu from "./assets/tech/anime/zenetsu.png";
import techZoro from "./assets/tech/anime/zoro.png";

// ── work ────────────────────────────────────────────────────
import workBook from "./assets/work/book.png";
import workCover from "./assets/work/cover.png";

// ── all images passed to loader ─────────────────────────────
const ALL_IMAGES = [
  backgroundImage,
  // hero
  cat,
  deku,
  fire,
  inoske,
  jinbe,
  killua,
  luffy,
  luffy2,
  luffy3,
  naruto,
  rengoku,
  zoro,
  // about
  aboutBig,
  aboutSmall,
  // contact
  contactPhoto,
  contactHandshake,
  // education
  collegeLpu,
  college,
  schoolKv,
  eduTen,
  eduTwl,
  // home
  homeGreen,
  homeRed,
  homeWhite,
  // projects
  crybug,
  devflow,
  helpmemake,
  podcast,
  whispherTails,
  // tech / anime
  techAurther,
  techGobi,
  techNaruto,
  techNezuko,
  techRengoku,
  techSanji,
  techToiji,
  techZenetsu,
  techZoro,
  // work
  workBook,
  workCover,
];

export default function App() {
  const [openResume, setOpenResume] = useState(false);

  return (
    <GearLoader imageSources={ALL_IMAGES}>
      <div className="h-screen w-full relative overflow-hidden text-white select-none">
        <img
          src={backgroundImage}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(1px) brightness(0.88)" }}
          alt="background"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/20" />
        <MainPanel onOpenResume={() => setOpenResume(true)} />
        <HeroCharacter />
        <LeftSidebar />
        <Dock
          openResumeExternal={openResume}
          onResumeOpened={() => setOpenResume(false)}
        />
      </div>
    </GearLoader>
  );
}
