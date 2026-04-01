import cerberus from "../../assets/hero/blue_flame_cerberus.png";

import cat from "../../assets/hero/cat.png";

import deku from "../../assets/hero/deku.png";
import dekuDark from "../../assets/hero/deku_dark_lightning_form.png";

import fire from "../../assets/hero/fire.png";

import inosuke from "../../assets/hero/inoske.png";

import itachi from "../../assets/hero/itachi_sharingan_closeup.png";

import jinbe from "../../assets/hero/jinbe.png";

import killua from "../../assets/hero/killua.png";

import luffy from "../../assets/hero/luffy.png";
import luffyVariant1 from "../../assets/hero/luffy2.png";
import luffyVariant2 from "../../assets/hero/luffy3.png";
import luffyGear5 from "../../assets/hero/luffy_gear5.png";

import naruto from "../../assets/hero/naruto.png";
import narutoKyuubi from "../../assets/hero/naruto_nine_tails_chakra_mode.png";

import rengoku from "../../assets/hero/rengoku.png";
import rengokuFlame from "../../assets/hero/rengoku_flame_attack.png";

import strawhatCrew from "../../assets/hero/straw_hat_crew_group.png";

import tanjiroFlame1 from "../../assets/hero/tanjiro_flame_katana.png";
import tanjiroFlame2 from "../../assets/hero/tanjiro_flame_spin_attack.png";

import zenitsu from "../../assets/hero/zenitsu_thunder_breathing.png";

import zoro from "../../assets/hero/zoro.png";

export const FILE_SYSTEM = {
  "/": {
    type: "dir",
    children: [
      "about.txt",
      "skills.txt",
      "projects",
      "experience",
      "certificates",
      "education",
      "contact",
    ],
  },
  "/about.txt": {
    type: "file",
    content: [
      "  name    : Ayush Jha",
      "  role    : Full-Stack Engineer & CS Student",
      "  year    : 3rd Year BTech Computer Science",
      "  stack   : MERN Stack · Socket.IO · JWT · OAuth",
      "  dsa     : 150+ problems solved",
      "  focus   : Scalable, production-grade systems",
      "  motto   : One Day One Build ✦",
    ],
  },
  "/skills.txt": {
    type: "file",
    content: [
      "  frontend  : React.js, HTML, CSS, Tailwind",
      "  backend   : Node.js, Express.js",
      "  database  : MongoDB",
      "  realtime  : Socket.IO",
      "  auth      : JWT, OAuth",
      "  apis      : RESTful API Design",
      "  mobile    : Android Integration",
      "  cs        : Data Structures & Algorithms",
      "  design    : System Design, Scalable Architecture",
    ],
  },
  "/projects": {
    type: "dir",
    children: ["whispertails", "helpmemake", "crybug"],
  },
  "/projects/whispertails": {
    type: "file",
    content: [
      "  project   : WhisperTails",
      "  type      : Full-Stack Web Application",
      "  stack     : MERN · Socket.IO · JWT",
      "  desc      : Real-time anonymous messaging platform",
      "             with secure auth and live updates.",
      "  features  : Multi-stage workflows, real-time comms,",
      "             JWT authentication, REST APIs",
    ],
  },
  "/projects/helpmemake": {
    type: "file",
    content: [
      "  project   : HelpMeMake",
      "  type      : Collaboration Platform",
      "  stack     : MERN · REST APIs · OAuth",
      "  desc      : Developer collaboration platform for",
      "             finding co-founders and contributors.",
      "  features  : OAuth login, project matching,",
      "             modular API architecture",
    ],
  },
  "/projects/crybug": {
    type: "file",
    content: [
      "  project   : CryBug",
      "  type      : Bug Tracking System",
      "  stack     : MERN · Express · MongoDB",
      "  desc      : Lightweight issue tracker with team",
      "             support and priority workflows.",
      "  features  : Role-based access, kanban board,",
      "             real-time notifications",
    ],
  },
  "/experience": {
    type: "dir",
    children: ["orbosis-global"],
  },
  "/experience/orbosis-global": {
    type: "file",
    content: [
      "  company   : Orbosis Global",
      "  role      : Full-Stack Developer Intern",
      "  stack     : MERN · REST APIs · Android",
      "  work      : Built a complete web platform end-to-end.",
      "             Designed modular RESTful APIs,",
      "             efficient database schemas, and",
      "             integrated backend with web + Android apps.",
      "  impact    : Delivered production-ready platform",
      "             used by real users.",
    ],
  },
  "/certificates": {
    type: "dir",
    children: [
      "cloud-computing",
      "oracle-ai-foundations",
      "jp-morgan-simulation",
    ],
  },
  "/certificates/cloud-computing": {
    type: "file",
    content: [
      "  cert      : Cloud Computing",
      "  issuer    : NPTEL / Coursera",
      "  topics    : Cloud architecture, AWS basics,",
      "             distributed systems, scalability",
    ],
  },
  "/certificates/oracle-ai-foundations": {
    type: "file",
    content: [
      "  cert      : Oracle AI Foundations",
      "  issuer    : Oracle",
      "  topics    : AI/ML fundamentals, Oracle Cloud,",
      "             machine learning pipelines",
    ],
  },
  "/certificates/jp-morgan-simulation": {
    type: "file",
    content: [
      "  cert      : JP Morgan Software Engineering",
      "  issuer    : Forage / JP Morgan Chase",
      "  topics    : Financial systems, React data viz,",
      "             production engineering practices",
    ],
  },
  "/education": {
    type: "dir",
    children: ["btech-cse", "intermediate", "matriculation"],
  },
  "/education/btech-cse": {
    type: "file",
    content: [
      "  degree    : B.Tech Computer Science & Engineering",
      "  year      : 3rd Year (ongoing)",
      "  focus     : Full-stack development, system design,",
      "             algorithms, software engineering",
    ],
  },
  "/education/intermediate": {
    type: "file",
    content: [
      "  level     : Intermediate (12th Grade)",
      "  stream    : Science — PCM",
      "  status    : Completed",
    ],
  },
  "/education/matriculation": {
    type: "file",
    content: [
      "  level     : Matriculation (10th Grade)",
      "  status    : Completed",
    ],
  },
  "/contact": {
    type: "dir",
    children: ["linkedin", "github", "email"],
  },
  "/contact/linkedin": {
    type: "file",
    content: [
      "  platform  : LinkedIn",
      "  url       : linkedin.com/in/ayushjha",
      "  type      : Professional networking",
    ],
  },
  "/contact/github": {
    type: "file",
    content: [
      "  platform  : GitHub",
      "  url       : github.com/ayushjha",
      "  type      : Open source & projects",
    ],
  },
  "/contact/email": {
    type: "file",
    content: [
      "  platform  : Email",
      "  address   : ayush@example.com",
      "  type      : Direct contact",
    ],
  },
};

export const SECTION_ALIASES = {
  about: "/about.txt",
  skills: "/skills.txt",
  projects: "/projects",
  experience: "/experience",
  work: "/experience",
  certificates: "/certificates",
  education: "/education",
  contact: "/contact",
};

export const FASTFETCH_IMAGES = [
  cerberus,
  zoro,
  luffyVariant2,
  tanjiroFlame1,
  narutoKyuubi,
  cat,
  rengokuFlame,
  dekuDark,
  jinbe,
  luffy,
  itachi,
  tanjiroFlame2,
  killua,
  inosuke,
  zenitsu,
  naruto,
  luffyGear5,
  rengoku,
  strawhatCrew,
  fire,
  deku,
  luffyVariant1,
];
