const DARK_ACRYLIC = {
  base: "rgba(20,20,28,0.55)",         // main glass
  border: "rgba(255,255,255,0.08)",    // soft border
  glowBlue: "rgba(80,160,255,0.25)",
  glowPurple: "rgba(180,120,255,0.25)",
  glowOrange: "rgba(255,140,90,0.25)",
  glowGreen: "rgba(120,200,150,0.25)",
  glowGold: "rgba(255,210,120,0.25)",
};
const APPS_CONFIG = [
  {
    key: "about",
    Icon: User,
    label: "About",
    color: DARK_ACRYLIC.glowBlue,
    Page: Home,
    pos: { x: 180, y: 60 },
    size: { width: 680, height: 420 },
  },
  {
    key: "skills",
    Icon: Cpu,
    label: "Skills",
    color: DARK_ACRYLIC.glowBlue,
    Page: Photoshop,
    pos: { x: 160, y: 55 },
    size: { width: 720, height: 500 },
  },
  {
    key: "projects",
    Icon: FolderKanban,
    label: "Projects",
    color: DARK_ACRYLIC.glowOrange,
    Page: Chrome,
    pos: { x: 140, y: 50 },
    size: { width: 760, height: 520 },
  },
  {
    key: "work",
    Icon: Briefcase,
    label: "Work",
    color: DARK_ACRYLIC.glowOrange,
    Page: Resume,
    pos: { x: 160, y: 60 },
    size: { width: 700, height: 520 },
  },
  {
    key: "certificates",
    Icon: Award,
    label: "Certificates",
    color: DARK_ACRYLIC.glowGold,
    Page: Resume,
    pos: { x: 170, y: 65 },
    size: { width: 680, height: 480 },
  },
  {
    key: "education",
    Icon: GraduationCap,
    label: "Education",
    color: DARK_ACRYLIC.glowGreen,
    Page: Resume,
    pos: { x: 190, y: 70 },
    size: { width: 680, height: 480 },
  },
  {
    key: "contact",
    Icon: Phone,
    label: "Contact",
    color: DARK_ACRYLIC.glowBlue,
    Page: Message,
    pos: { x: 190, y: 65 },
    size: { width: 680, height: 480 },
  },
  {
    key: "ai",
    Icon: Brain,
    label: "AI",
    color: DARK_ACRYLIC.glowPurple,
    Page: TerminalPage,
    pos: { x: 220, y: 80 },
    size: { width: 640, height: 420 },
  },
  {
    key: "terminal",
    Icon: Terminal,
    label: "Terminal",
    color: "rgba(255,255,255,0.08)",
    Page: TerminalPage,
    pos: { x: 220, y: 80 },
    size: { width: 640, height: 420 },
  },
  {
    key: "normal",
    Icon: Layout,
    label: "Normal",
    color: "rgba(255,255,255,0.06)",
    Page: Chrome,
    pos: { x: 200, y: 70 },
    size: { width: 720, height: 500 },
  },
  {
    key: "resume",
    Icon: FileText,
    label: "Resume",
    color: DARK_ACRYLIC.glowOrange,
    Page: Resume,
    pos: { x: 160, y: 60 },
    size: { width: 700, height: 520 },
  },
];

==============================================================================================================

import {
  User,
  Cpu,
  FolderKanban,
  Briefcase,
  Award,
  GraduationCap,
  Phone,
  Brain,
  Terminal,
  Layout,
  FileText,
} from "lucide-react";

import Home from "../Pages/Home";
import Chrome from "../Pages/Chrome";
import Photoshop from "../Pages/Photoshop";
import TerminalPage from "../Pages/Terminal";
import Message from "../Pages/Message";
import Resume from "../Pages/Resume";
import Window from "./Window";

const APPS_CONFIG = [
  {
    key: "about",
    Icon: User,
    label: "About",
    color: "rgba(80,160,255,0.9)", // soft blue
    Page: Home,
    pos: { x: 180, y: 60 },
    size: { width: 680, height: 420 },
  },
  {
    key: "skills",
    Icon: Cpu,
    label: "Skills",
    color: "rgba(120,180,255,0.9)", // tech blue
    Page: Photoshop,
    pos: { x: 160, y: 55 },
    size: { width: 720, height: 500 },
  },
  {
    key: "projects",
    Icon: FolderKanban,
    label: "Projects",
    color: "rgba(255,120,80,0.9)", // orange/red
    Page: Chrome,
    pos: { x: 140, y: 50 },
    size: { width: 760, height: 520 },
  },
  {
    key: "work",
    Icon: Briefcase,
    label: "Work",
    color: "rgba(255,170,90,0.9)", // warm orange
    Page: Resume,
    pos: { x: 160, y: 60 },
    size: { width: 700, height: 520 },
  },
  {
    key: "certificates",
    Icon: Award,
    label: "Certificates",
    color: "rgba(255,210,100,0.9)", // gold
    Page: Resume,
    pos: { x: 170, y: 65 },
    size: { width: 680, height: 480 },
  },
  {
    key: "education",
    Icon: GraduationCap,
    label: "Education",
    color: "rgba(120,200,150,0.9)", // green
    Page: Resume,
    pos: { x: 190, y: 70 },
    size: { width: 680, height: 480 },
  },
  {
    key: "contact",
    Icon: Phone,
    label: "Contact",
    color: "rgba(100,140,255,0.9)", // soft blue
    Page: Message,
    pos: { x: 190, y: 65 },
    size: { width: 680, height: 480 },
  },
  {
    key: "ai",
    Icon: Brain,
    label: "AI",
    color: "rgba(180,120,255,0.9)", // purple
    Page: TerminalPage,
    pos: { x: 220, y: 80 },
    size: { width: 640, height: 420 },
  },
  {
    key: "terminal",
    Icon: Terminal,
    label: "Terminal",
    color: "rgba(120,120,120,0.9)", // gray
    Page: TerminalPage,
    pos: { x: 220, y: 80 },
    size: { width: 640, height: 420 },
  },
  {
    key: "normal",
    Icon: Layout,
    label: "Normal",
    color: "rgba(180,180,180,0.9)", // light gray
    Page: Chrome,
    pos: { x: 200, y: 70 },
    size: { width: 720, height: 500 },
  },
  {
    key: "resume",
    Icon: FileText,
    label: "Resume",
    color: "rgba(255,145,40,0.9)", // keep but refined
    Page: Resume,
    pos: { x: 160, y: 60 },
    size: { width: 700, height: 520 },
  },
];