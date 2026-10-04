import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

/* Palette (shared with CSS tokens) */
export const PALETTE = {
  gold: "#c9a961",
  goldLight: "#e2cf9a",
  goldDeep: "#9c7b3a",
  ivory: "#f4f0e6",
  forest: "#1f3a2b",
  forestDeep: "#0b1812",
  forestLight: "#3d5f49",
  emerald: "#2b4a37",
};

/* ------------------------------------------------------------------ */
/*  Procedural studio environment — no network HDR required            */
/* ------------------------------------------------------------------ */
export function Studio({ intensity = 1 }: { intensity?: number }) {
  return (
    <Environment resolution={256} frames={1}>
      {/* key — warm gold */}
      <Lightformer
        form="rect"
        intensity={5 * intensity}
        color="#f1dfae"
        position={[4, 4, 3]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={[6, 4, 1]}
      />
      {/* rim — cool green */}
      <Lightformer
        form="rect"
        intensity={3.5 * intensity}
        color="#9cc4a8"
        position={[-5, 2, -3]}
        rotation={[0, Math.PI / 3, 0]}
        scale={[6, 6, 1]}
      />
      {/* top soft */}
      <Lightformer
        form="ring"
        intensity={3 * intensity}
        color="#fff6e0"
        position={[0, 6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[5, 5, 1]}
      />
      {/* fill below */}
      <Lightformer
        form="rect"
        intensity={1.2 * intensity}
        color="#d6c594"
        position={[0, -5, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
      />
      {/* long strip reflections */}
      <Lightformer
        form="rect"
        intensity={2 * intensity}
        color="#ffffff"
        position={[0, 1, -6]}
        scale={[14, 0.6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.5 * intensity}
        color="#c9a961"
        position={[6, -1, -2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[8, 0.4, 1]}
      />
    </Environment>
  );
}

/* ------------------------------------------------------------------ */
/*  Materials                                                          */
/* ------------------------------------------------------------------ */
export function GoldMaterial({
  roughness = 0.22,
  color = PALETTE.gold,
  emissiveIntensity = 0.05,
}: {
  roughness?: number;
  color?: string;
  emissiveIntensity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={1}
      roughness={roughness}
      emissive={PALETTE.goldDeep}
      emissiveIntensity={emissiveIntensity}
      envMapIntensity={1.4}
    />
  );
}

export function GreenGlassMaterial({
  opacity = 0.92,
  color = PALETTE.forest,
}: {
  opacity?: number;
  color?: string;
}) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.15}
      roughness={0.12}
      clearcoat={1}
      clearcoatRoughness={0.08}
      transparent
      opacity={opacity}
      envMapIntensity={1.2}
      side={THREE.DoubleSide}
    />
  );
}

export function IvoryMaterial() {
  return (
    <meshPhysicalMaterial
      color={PALETTE.ivory}
      metalness={0}
      roughness={0.35}
      clearcoat={0.6}
      clearcoatRoughness={0.3}
      envMapIntensity={0.9}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Gold dust                                                          */
/* ------------------------------------------------------------------ */
export function GoldDust({
  count = 120,
  scale = 14,
  size = 2.2,
  speed = 0.25,
}: {
  count?: number;
  scale?: number | [number, number, number];
  size?: number;
  speed?: number;
}) {
  return (
    <Sparkles
      count={count}
      scale={scale}
      size={size}
      speed={speed}
      opacity={0.6}
      color={PALETTE.goldLight}
      noise={1}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas that only renders while visible in the viewport             */
/* ------------------------------------------------------------------ */
export function LazyCanvas({
  children,
  className,
  camera,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
} & Omit<CanvasProps, "children" | "camera">) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <Canvas
        dpr={[1, 2]}
        frameloop={visible ? "always" : "never"}
        camera={camera ?? { position: [0, 0, 9], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        {...rest}
      >
        {children}
      </Canvas>
    </div>
  );
}
