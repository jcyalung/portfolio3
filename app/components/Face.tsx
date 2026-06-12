"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

export type EyeStyle = "arc" | "dot";
export type MouthStyle = "openSmile" | "smile" | "line";

export interface FaceProps {
  eyes: EyeStyle;
  mouth: MouthStyle;
  position?: [number, number, number];
  /** When true, the head gently turns toward the pointer. */
  follow?: boolean;
  /** Phase offset so multiple faces don't bob in sync. */
  phase?: number;
  /** Fired when the model is clicked. */
  onSelect?: () => void;
  /** Fired when the click-triggered spin finishes. */
  onSpinEnd?: () => void;
}

const SPIN_DURATION = 3; // seconds

// Each spin uses a random whole number of turns (so it lands back on the
// starting orientation) and a random direction.
function randomSpinTurns(): number {
  const turns = 2 + Math.floor(Math.random() * 3); // 2, 3, or 4 full turns
  const direction = Math.random() < 0.5 ? -1 : 1;
  return turns * direction;
}

// A random, mostly-diagonal axis to tumble around (x and y dominate, with a
// little z) so the spin isn't a flat turntable rotation.
function randomSpinAxis(): THREE.Vector3 {
  const axis = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(2),
    THREE.MathUtils.randFloatSpread(2),
    THREE.MathUtils.randFloatSpread(0.6),
  );
  if (axis.lengthSq() < 1e-4) axis.set(1, 1, 0);
  return axis.normalize();
}

// Scratch objects reused every frame to avoid per-frame allocations.
const _spinDelta = new THREE.Quaternion();

// Smooth acceleration + deceleration so the spin eases in and out.
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/*
 * Geometries and materials are created once at module scope and shared across
 * every Face instance. Re-using them keeps the draw-call/material count tiny so
 * the scene renders fast even with several faces on screen.
 */
const HEAD_RADIUS = 1;

const headGeometry = new THREE.SphereGeometry(HEAD_RADIUS, 48, 48);
const dotEyeGeometry = new THREE.SphereGeometry(0.12, 20, 20);
// "∩" caret eye: upper half of a thin torus ring.
const arcEyeGeometry = new THREE.TorusGeometry(0.13, 0.04, 12, 28, Math.PI);
// "∪" smile: lower half of a thicker torus ring (flipped via rotation below).
const smileGeometry = new THREE.TorusGeometry(0.34, 0.075, 14, 36, Math.PI);
// neutral straight mouth.
const lineGeometry = new THREE.BoxGeometry(0.42, 0.06, 0.08);

// Filled open-mouth smile: a half-disc (flat top, rounded bottom) extruded for depth.
const mouthShape = new THREE.Shape();
const MOUTH_HALF_WIDTH = 0.42;
mouthShape.moveTo(-MOUTH_HALF_WIDTH, 0);
mouthShape.lineTo(MOUTH_HALF_WIDTH, 0);
mouthShape.absarc(0, 0, MOUTH_HALF_WIDTH, 0, Math.PI, true);
const openSmileGeometry = new THREE.ExtrudeGeometry(mouthShape, {
  depth: 0.08,
  bevelEnabled: false,
  curveSegments: 28,
});

const headMaterial = new THREE.MeshStandardMaterial({
  color: "#c2c2c4",
  roughness: 0.55,
  metalness: 0.05,
});
const eyeMaterial = new THREE.MeshStandardMaterial({
  color: "#0a0a0a",
  roughness: 0.4,
});
const mouthMaterial = new THREE.MeshStandardMaterial({
  color: "#37373c",
  roughness: 0.5,
});

function Eyes({ style }: { style: EyeStyle }) {
  if (style === "dot") {
    return (
      <>
        <mesh
          geometry={dotEyeGeometry}
          material={eyeMaterial}
          position={[-0.36, 0.26, 0.9]}
        />
        <mesh
          geometry={dotEyeGeometry}
          material={eyeMaterial}
          position={[0.36, 0.26, 0.9]}
        />
      </>
    );
  }

  return (
    <>
      <mesh
        geometry={arcEyeGeometry}
        material={eyeMaterial}
        position={[-0.34, 0.28, 0.92]}
      />
      <mesh
        geometry={arcEyeGeometry}
        material={eyeMaterial}
        position={[0.34, 0.28, 0.92]}
      />
    </>
  );
}

function Mouth({ style }: { style: MouthStyle }) {
  if (style === "line") {
    return (
      <mesh
        geometry={lineGeometry}
        material={eyeMaterial}
        position={[0, -0.32, 0.95]}
      />
    );
  }

  if (style === "smile") {
    return (
      <mesh
        geometry={smileGeometry}
        material={mouthMaterial}
        position={[0, -0.1, 0.92]}
        rotation={[0.18, 0, Math.PI]}
      />
    );
  }

  // openSmile
  return (
    <mesh
      geometry={openSmileGeometry}
      material={mouthMaterial}
      position={[0, -0.02, 0.95]}
      rotation={[0.2, 0, 0]}
    />
  );
}

export default function Face({
  eyes,
  mouth,
  position = [0, 0, 0],
  follow = true,
  phase = 0,
  onSelect,
  onSpinEnd,
}: FaceProps) {
  const inner = useRef<Group>(null);
  const spinStart = useRef<number | null>(null);
  const spinTurns = useRef(0);
  const spinAxis = useRef(new THREE.Vector3(0, 1, 0));
  // The orientation the spin starts from and returns to.
  const spinBaseQuat = useRef(new THREE.Quaternion());
  // Pointer position in normalized device coords (-1..1), tracked across the
  // whole window so the head follows even when the cursor is outside the canvas.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const startSpin = () => {
    const group = inner.current;
    if (group && spinStart.current === null) {
      spinBaseQuat.current.copy(group.quaternion);
    }
    spinTurns.current = randomSpinTurns();
    spinAxis.current = randomSpinAxis();
    // `-1` flags "begin on the next frame" so we capture the clock there.
    spinStart.current = -1;
    onSelect?.();
  };

  useFrame((state) => {
    const group = inner.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    if (spinStart.current !== null) {
      if (spinStart.current < 0) spinStart.current = t;
      const elapsed = t - spinStart.current;

      if (elapsed >= SPIN_DURATION) {
        // Land exactly back on the starting orientation, then resume follow.
        group.quaternion.copy(spinBaseQuat.current);
        spinStart.current = null;
        onSpinEnd?.();
      } else {
        const eased = easeInOutCubic(elapsed / SPIN_DURATION);
        const angle = eased * spinTurns.current * Math.PI * 2;
        _spinDelta.setFromAxisAngle(spinAxis.current, angle);
        group.quaternion.copy(spinBaseQuat.current).multiply(_spinDelta);
      }
    } else {
      // Idle: gently follow the pointer on both axes.
      const targetY = follow ? pointer.current.x * 0.55 : 0;
      const targetX = follow ? pointer.current.y * 0.35 : 0;
      group.rotation.y += (targetY - group.rotation.y) * 0.08;
      group.rotation.x += (targetX - group.rotation.x) * 0.08;
    }

    group.position.y = Math.sin(t * 0.9 + phase) * 0.05;
  });

  return (
    <group position={position}>
      <group
        ref={inner}
        onClick={(e) => {
          e.stopPropagation();
          startSpin();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <mesh geometry={headGeometry} material={headMaterial} />
        <Eyes style={eyes} />
        <Mouth style={mouth} />
      </group>
    </group>
  );
}
