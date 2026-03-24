import LeftSidebar from "./components/LeftSidebar";
import MainPanel from "./components/MainPanel";
import HeroCharacter from "./components/HeroCharacter";
import Dock from "./components/Dock";
import backgroundImage from "./assets/bg.png";

export default function App() {
  return (
    <div className="h-screen w-full relative overflow-hidden text-white select-none">
      <img
        src={backgroundImage}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(1px) brightness(0.88)" }}
        alt="background"
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/20" />

      <MainPanel />
      <HeroCharacter />
      <LeftSidebar />
      <Dock />
    </div>
  );
}
