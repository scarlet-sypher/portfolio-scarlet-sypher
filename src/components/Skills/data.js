export const LOGOS = {
  react: {
    label: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  nextjs: {
    label: "Next.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  node: {
    label: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  express: {
    label: "Express.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  mongodb: {
    label: "MongoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  redux: {
    label: "Redux",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  tailwind: {
    label: "Tailwind",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  java: {
    label: "Java",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  cpp: {
    label: "C++",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  python: {
    label: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  js: {
    label: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  ts: {
    label: "TypeScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  php: {
    label: "PHP",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  shell: {
    label: "Shell",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  mysql: {
    label: "MySQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  postgres: {
    label: "PostgreSQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  sqlite: {
    label: "SQLite",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  redis: {
    label: "Redis",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  html: {
    label: "HTML5",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  css: {
    label: "CSS3",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  sass: {
    label: "Sass",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  three: {
    label: "Three.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  framer: {
    label: "Framer Motion",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  },
  graphql: {
    label: "GraphQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  pandas: {
    label: "Pandas",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  numpy: {
    label: "NumPy",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  tensorflow: {
    label: "TensorFlow",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  firebase: {
    label: "Firebase",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  android: {
    label: "Android",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  arduino: {
    label: "Arduino",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
  },
  selenium: {
    label: "Selenium",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  },
  git: {
    label: "Git",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  github: {
    label: "GitHub",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  gitlab: {
    label: "GitLab",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  },
  docker: {
    label: "Docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  kubernetes: {
    label: "Kubernetes",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  linux: {
    label: "Linux",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  vite: {
    label: "Vite",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
  },
  webpack: {
    label: "Webpack",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  },
  npm: {
    label: "NPM",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  laravel: {
    label: "Laravel",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
};

export const LOGO_MAP = Object.fromEntries(
  Object.values(LOGOS).map((l) => [l.label, l]),
);

export const SOFT = [
  "Communication",
  "Leadership",
  "Collaboration",
  "Adaptability",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Attention to Detail",
];

export const STATS = [
  {
    title: "Primary Language",
    value: "Java",
    sub: "OOP + DSA",
    color: "#38bdf8",
    icon: "cpu",
  },
  {
    title: "Core Stack",
    value: "MERN",
    sub: "React · Node · Express · MongoDB",
    color: "#f59e0b",
    icon: "layers",
  },
  {
    title: "Backend",
    value: "API & System Design",
    sub: "Scalable + Clean Architecture",
    color: "#34d399",
    icon: "code",
  },
  {
    title: "Core CS",
    value: "OOP · OS · DBMS",
    sub: "Strong Fundamentals",
    color: "#a78bfa",
    icon: "trophy",
  },
];
