"use client";

import { Canvas } from "@react-three/fiber";
import Face, { type EyeStyle, type MouthStyle } from "./Face";
import { useExpression, type ExpressionKey } from "./ExpressionContext";

const EXPRESSIONS: Record<ExpressionKey, { eyes: EyeStyle; mouth: MouthStyle }> =
  {
    neutral1: { eyes: "dot", mouth: "line" },
    happy1: { eyes: "arc", mouth: "openSmile" },
    happy2: { eyes: "dot", mouth: "smile" },
  };

export default function EmojiScene() {
  const { active, setHovered, setPinned } = useExpression();
  const { eyes, mouth } = EXPRESSIONS[active];

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 2]} intensity={0.3} />
        <Face
          eyes={eyes}
          mouth={mouth}
          position={[0, 0, 0]}
          onSelect={() => {
            setHovered(null);
            setPinned("happy2");
          }}
          onSpinEnd={() => setPinned("neutral1")}
        />
      </Canvas>
    </div>
  );
}
