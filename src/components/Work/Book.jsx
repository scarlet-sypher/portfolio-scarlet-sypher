import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

import { WORK_DATA } from "./workData";
import StarField from "./StarField";
import Planet from "./Planet";
import ThemeToggle from "./ThemeToggle";
import DescriptionPanel from "./DescriptionPanel";
import ProgressDots from "./ProgressDots";
import {
  CoverFront,
  CoverInside,
  IndexPage,
  ChapterPage,
  DetailsPage,
  EndPage,
} from "./BookPages";

export default function Book({
  isMaximized = false,
  darkBook = false,
  onToggleDark,
}) {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pageW = isMaximized ? 560 : 240;
  const pageH = isMaximized ? 780 : 360;

  const activeWork = (() => {
    if (currentPage < 3 || currentPage > 14) return null;
    const idx = Math.floor((currentPage - 3) / 2);
    return WORK_DATA[idx] ?? null;
  })();

  const dotCount = 9;
  const activeDot =
    currentPage <= 0
      ? 0
      : currentPage <= 2
        ? 1
        : currentPage >= 15
          ? 8
          : 2 + Math.floor((currentPage - 3) / 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=DM+Sans:wght@300;400&display=swap');
        @keyframes bkPlanet   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes panelFadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .stf__parent { overflow: visible !important; }
      `}</style>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 50% 38%, #0d1b2a 0%, #060c14 55%, #020508 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StarField />

        <Planet
          size={80}
          color="#4f8ef7"
          style={{ left: "-6px", top: "6%" }}
          ring
          speed={40}
        />
        <Planet
          size={44}
          color="#a855f7"
          style={{ right: "4%", top: "3%" }}
          speed={25}
        />
        <Planet
          size={28}
          color="#10b981"
          style={{ right: "7%", bottom: "12%" }}
          speed={32}
        />
        <Planet
          size={115}
          color="#1a3560"
          style={{ right: "18%", top: "22%" }}
          ring
          speed={62}
        />
        <Planet
          size={16}
          color="#f59e0b"
          style={{ left: "10%", bottom: "15%" }}
          speed={21}
        />

        <ThemeToggle darkBook={darkBook} onToggleDark={onToggleDark} />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: isMaximized ? 24 : 18,
          }}
        >
          <div
            style={{
              filter:
                "drop-shadow(0 30px 60px rgba(0,0,0,0.85)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))",

              cursor: "grab",
            }}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={pageW}
              height={pageH}
              size="fixed"
              minWidth={pageW}
              maxWidth={pageW}
              minHeight={pageH}
              maxHeight={pageH}
              showCover={true}
              drawShadow={true}
              maxShadowOpacity={0.6}
              flippingTime={780}
              usePortrait={false}
              startPage={0}
              useMouseEvents={true}
              swipeDistance={30}
              onFlip={(e) => setCurrentPage(e.data)}
              style={{ cursor: "grab" }}
            >
              <CoverFront />
              <CoverInside dark={darkBook} />
              <IndexPage dark={darkBook} />
              {WORK_DATA.flatMap((work) => [
                <ChapterPage key={`c${work.id}`} work={work} dark={darkBook} />,
                <DetailsPage key={`d${work.id}`} work={work} dark={darkBook} />,
              ])}
              <EndPage dark={darkBook} />
            </HTMLFlipBook>
          </div>

          <DescriptionPanel work={activeWork} bookH={pageH} />
        </div>

        <ProgressDots dotCount={dotCount} activeDot={activeDot} />
      </div>
    </>
  );
}
