export default function AllFilters({ pairs }) {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {[...pairs, { id: "zoro", seed: 9 }].map((p) => (
          <filter
            key={p.id}
            id={`ef-${p.id}`}
            x="-18%"
            y="-18%"
            width="136%"
            height="136%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.024"
              numOctaves="4"
              result="noise"
              seed={p.seed}
            >
              <animate
                attributeName="baseFrequency"
                values="0.019;0.031;0.019"
                dur={`${3.2 + p.seed * 0.25}s`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
