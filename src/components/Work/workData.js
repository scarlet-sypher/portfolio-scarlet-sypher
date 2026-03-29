import {
  Globe,
  Server,
  Layers,
  Database,
  Smartphone,
  Code2,
} from "lucide-react";

export const WORK_DATA = [
  {
    id: 1,
    chapter: "01",
    title: "Orbosis Global",
    role: "Full-Stack Intern",
    period: "2024",
    Icon: Globe,
    color: "#4f8ef7",
    accent: "#a8c8ff",
    description:
      "Delivered a complete web platform end-to-end. Built modular RESTful APIs, designed efficient database schemas, and integrated backend services with both web and Android applications. Worked across the full MERN stack in a production environment.",
    tags: ["MERN", "REST API", "MongoDB", "Android"],
  },
  {
    id: 2,
    chapter: "02",
    title: "System Architecture",
    role: "Backend Engineering",
    period: "Ongoing",
    Icon: Server,
    color: "#a855f7",
    accent: "#ddb6ff",
    description:
      "Designed and built systems with clear separation of concerns, scalable architecture, and optimized data handling. Implemented multi-stage workflows, real-time communication using Socket.IO, and secure auth with JWT & OAuth.",
    tags: ["Socket.IO", "JWT", "OAuth", "Node.js"],
  },
  {
    id: 3,
    chapter: "03",
    title: "Frontend Engineering",
    role: "React.js Development",
    period: "2023–Present",
    Icon: Layers,
    color: "#06b6d4",
    accent: "#a5f3fc",
    description:
      "Built responsive, component-driven interfaces with React.js. Focused on clean component architecture, state management, and performance optimisation. Delivered pixel-perfect implementations from design files.",
    tags: ["React.js", "Tailwind", "Framer Motion", "Vite"],
  },
  {
    id: 4,
    chapter: "04",
    title: "Database Design",
    role: "MongoDB & Schema Design",
    period: "2023–Present",
    Icon: Database,
    color: "#10b981",
    accent: "#6ee7b7",
    description:
      "Crafted efficient MongoDB schemas for complex data across multiple projects. Optimised queries, implemented indexing strategies, and designed data models that scale cleanly under load.",
    tags: ["MongoDB", "Mongoose", "Schema Design", "Indexing"],
  },
  {
    id: 5,
    chapter: "05",
    title: "Mobile Integration",
    role: "Android & API Bridge",
    period: "2024",
    Icon: Smartphone,
    color: "#f59e0b",
    accent: "#fde68a",
    description:
      "Integrated backend services with Android applications. Designed API contracts that worked seamlessly across platforms, handled auth flows, and ensured reliable data sync between mobile and web clients.",
    tags: ["Android", "REST", "Auth Flow", "Cross-platform"],
  },
  {
    id: 6,
    chapter: "06",
    title: "DSA & Algorithms",
    role: "Problem Solving",
    period: "150+ Problems",
    Icon: Code2,
    color: "#ef4444",
    accent: "#fca5a5",
    description:
      "Solved 150+ DSA problems across arrays, trees, graphs, and dynamic programming. This directly strengthens backend thinking — efficient algorithms, optimal data structures, and clean code under constraints.",
    tags: ["LeetCode", "Algorithms", "Data Structures", "CP"],
  },
];
