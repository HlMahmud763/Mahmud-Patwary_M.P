import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  GoldDust,
  GoldMaterial,
  GreenGlassMaterial,
  IvoryMaterial,
  LazyCanvas,
  PALETTE,
  Studio,
} from "./shared";

type Key = { p: [number, number, number]; r: [number, number, number]; s?: number };
type Layer = {
  size: [number, number, number];
  radius: number;
  mat: "gold" | "green" | "greenLight" | "ivory" | "emerald";
  keys: [Key, Key, Key]; // exploded → layered → final
};

const LAYERS: Layer[] = [
  // base screen
  {
    size: [5.2, 3.3, 0.12],
    radius: 0.16,
    mat: "ivory",
    keys: [
      { p: [-1.5, -2.6, -4], r: [1.1, -0.8, 0.5] },
      { p: [0, 0, -0.6], r: [0, 0, 0] },
      { p: [0, 0, 0], r: [0, 0, 0] },
    ],
  },
  // header bar
  {
    size: [5.2, 0.42, 0.08],
    radius: 0.06,
    mat: "gold",
    keys: [
      { p: [3.5, 3.4, 1.5], r: [0.6, 0.4, -1.2] },
      { p: [0, 1.44, 0.3], r: [0, 0, 0] },
      { p: [0, 1.44, 0.08], r: [0, 0, 0] },
    ],
  },
  // hero block
  {
    size: [3.1, 1.5, 0.1],
    radius: 0.1,
    mat: "emerald",
    keys: [
      { p: [-4.5, 1.8, 2.5], r: [-0.8, 0.9, 0.6] },
      { p: [-0.9, 0.35, 0.9], r: [0, 0, 0] },
      { p: [-0.9, 0.35, 0.1], r: [0, 0, 0] },
    ],
  },
  // side panel
  {
    size: [1.7, 1.5, 0.1],
    radius: 0.1,
    mat: "greenLight",
    keys: [
      { p: [4.8, -1.2, 3], r: [0.9, -1.1, 0.3] },
      { p: [1.6, 0.35, 1.4], r: [0, 0, 0] },
      { p: [1.6, 0.35, 0.1], r: [0, 0, 0] },
    ],
  },
  // cards
  {
    size: [1.5, 1.0, 0.1],
    radius: 0.08,
    mat: "greenLight",
    keys: [
      { p: [-5, -1.5, 1], r: [0.3, 1.3, -0.7] },
      { p: [-1.7, -0.95, 1.8], r: [0, 0, 0] },
      { p: [-1.7, -0.95, 0.1], r: [0, 0, 0] },
    ],
  },
  {
    size: [1.5, 1.0, 0.1],
    radius: 0.08,
    mat: "gold",
    keys: [
      { p: [0.5, -4, 2.5], r: [-1.2, 0.2, 0.9] },
      { p: [0, -0.95, 2.2], r: [0, 0, 0] },
      { p: [0, -0.95, 0.1], r: [0, 0, 0] },
    ],
  },
  {
    size: [1.5, 1.0, 0.1],
    radius: 0.08,
    mat: "emerald",
    keys: [
      { p: [5.5, 1.5, -1.5], r: [0.7, -0.6, 1.4] },
      { p: [1.7, -0.95, 1.8], r: [0, 0, 0] },
      { p: [1.7, -0.95, 0.1], r: [0, 0, 0] },
    ],
  },
  // small accents
  {
    size: [1.2, 0.14, 0.06],
    radius: 0.03,
    mat: "gold",
    keys: [
      { p: [-3, 3.5, -2], r: [1.5, 0.4, 0.2] },
      { p: [-1.5, 0.75, 1.1], r: [0, 0, 0] },
      { p: [-1.5, 0.75, 0.18], r: [0, 0, 0] },
    ],
  },
  {
    size: [2.2, 0.08, 0.04],
    radius: 0.02,
    mat: "ivory",
    keys: [
      { p: [2.5, -3.2, -2.5], r: [0.2, 1.1, 1.3] },
      { p: [-1.1, 0.42, 1.1], r: [0, 0, 0] },
      { p: [-1.1, 0.42, 0.18], r: [0, 0, 0] },
    ],
  },
  {
    size: [1.6, 0.08, 0.04],
    radius: 0.02,
    mat: "ivory",
    keys: [
      { p: [-2, 2.8, 3], r: [0.9, -0.6, 0.4] },
      { p: [-1.4, 0.2, 1.1], r: [0, 0, 0] },
      { p: [-1.4, 0.2, 0.18], r: [0, 0, 0] },
    ],
  },
  // CTA pill
  {
    size: [0.9, 0.26, 0.08],
    radius: 0.13,
    mat: "gold",
    keys: [
      { p: [3.2, 2.6, 3.4], r: [0.4, 0.8, -0.9] },
      { p: [-1.8, -0.15, 1.2], r: [0, 0, 0] },
      { p: [-1.8, -0.15, 0.2], r: [0, 0, 0] },
    ],
  },
];

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}
function seg(p: number, a: number, b: number) {
  return smoothstep((p - a) / (b - a));
}

function Mat({ kind }: { kind: Layer["mat"] }) {
  switch (kind) {
    case "gold":
      return <GoldMaterial roughness={0.22} />;
    case "green":
      return <GreenGlassMaterial opacity={1} color={PALETTE.forest} />;
    case "greenLight":
      return <GreenGlassMaterial opacity={1} color={PALETTE.forestLight} />;
    case "emerald":
      return <GreenGlassMaterial opacity={1} color={PALETTE.emerald} />;
    default:
      return <IvoryMaterial />;
  }
}

function LayerMesh({
  layer,
  pRef,
}: {
  layer: Layer;
  pRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const p = pRef.current;
    const [k0, k1, k2] = layer.keys;
    let from: Key, to: Key, t: number;
    if (p < 0.55) {
      from = k0;
      to = k1;
      t = seg(p, 0.02, 0.55);
    } else {
      from = k1;
      to = k2;
      t = seg(p, 0.55, 0.92);
    }
    tmpA.set(...from.p);
    tmpB.set(...to.p);
    g.position.lerpVectors(tmpA, tmpB, t);
    g.rotation.set(
      THREE.MathUtils.lerp(from.r[0], to.r[0], t),
      THREE.MathUtils.lerp(from.r[1], to.r[1], t),
      THREE.MathUtils.lerp(from.r[2], to.r[2], t),
    );
    // gentle idle breathing while exploded
    const idle = (1 - seg(p, 0, 0.5)) * 0.25;
    const tt = state.clock.elapsedTime;
    g.position.y += Math.sin(tt * 0.8 + seed) * idle;
    g.position.x += Math.cos(tt * 0.6 + seed) * idle * 0.6;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={layer.size} radius={layer.radius} smoothness={5}>
        <Mat kind={layer.mat} />
      </RoundedBox>
    </group>
  );
}

function Frame({ pRef }: { pRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const p = pRef.current;
    const t = seg(p, 0.7, 1);
    if (ref.current) {
      ref.current.scale.setScalar(0.6 + 0.4 * t);
      (ref.current.children as THREE.Mesh[]).forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity = t;
      });
    }
    if (halo.current) {
      halo.current.rotation.z = state.clock.elapsedTime * 0.12;
      halo.current.scale.setScalar(0.7 + 0.5 * seg(p, 0.6, 1));
      (halo.current.material as THREE.MeshStandardMaterial).opacity = 0.5 * seg(p, 0.55, 0.95);
    }
  });
  return (
    <>
      <group ref={ref} position={[0, 0, -0.1]}>
        <mesh position={[0, 1.78, 0]}>
          <boxGeometry args={[5.6, 0.04, 0.04]} />
          <meshStandardMaterial color={PALETTE.gold} metalness={1} roughness={0.25} transparent />
        </mesh>
        <mesh position={[0, -1.78, 0]}>
          <boxGeometry args={[5.6, 0.04, 0.04]} />
          <meshStandardMaterial color={PALETTE.gold} metalness={1} roughness={0.25} transparent />
        </mesh>
        <mesh position={[-2.78, 0, 0]}>
          <boxGeometry args={[0.04, 3.6, 0.04]} />
          <meshStandardMaterial color={PALETTE.gold} metalness={1} roughness={0.25} transparent />
        </mesh>
        <mesh position={[2.78, 0, 0]}>
          <boxGeometry args={[0.04, 3.6, 0.04]} />
          <meshStandardMaterial color={PALETTE.gold} metalness={1} roughness={0.25} transparent />
        </mesh>
      </group>
      <mesh ref={halo} position={[0, 0, -1.5]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[4.4, 0.02, 12, 220]} />
        <meshStandardMaterial
          color={PALETTE.goldLight}
          metalness={1}
          roughness={0.3}
          transparent
          opacity={0}
        />
      </mesh>
    </>
  );
}

function Knot({ pRef }: { pRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const m = ref.current;
    if (!m) return;
    const p = pRef.current;
    m.rotation.x += dt * 0.3;
    m.rotation.y += dt * 0.4;
    const a = p * Math.PI * 1.6;
    const radius = 4.2 - seg(p, 0.6, 1) * 1.2;
    m.position.set(Math.cos(a) * radius, Math.sin(a * 0.7) * 1.6 + 0.4, -2 + Math.sin(a) * 1.5);
    const s = 0.7 - seg(p, 0.75, 1) * 0.45;
    m.scale.setScalar(s);
    void state;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.8, 0.26, 200, 32, 2, 3]} />
      <GoldMaterial roughness={0.16} />
    </mesh>
  );
}

function Rig({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const pRef = useRef(0);
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    // smooth the scroll progress → feels like a scrubbed video
    pRef.current = THREE.MathUtils.damp(pRef.current, progress.get(), 5, dt);
    const p = pRef.current;
    const { x, y } = state.pointer;

    if (group.current) {
      const g = group.current;
      // continuous rotation: exploded (tilted) → layered 3D view → flat final
      const ry = THREE.MathUtils.lerp(0.9, -0.55, seg(p, 0, 0.55)) * (1 - seg(p, 0.55, 0.95));
      const rx = THREE.MathUtils.lerp(0.35, 0.22, seg(p, 0, 0.55)) * (1 - seg(p, 0.55, 0.95));
      g.rotation.y = ry + x * 0.08;
      g.rotation.x = rx - y * 0.06;
      // lift & settle the finished composition so the closing caption sits beneath it
      const settle = seg(p, 0.62, 0.95);
      g.position.y = THREE.MathUtils.lerp(0, 0.85, settle);
      g.scale.setScalar(THREE.MathUtils.lerp(1, 0.86, settle));
    }
    const zoomOut = state.size.width < 768 ? 1.7 : state.size.width < 1024 ? 1.25 : 1;
    const z = THREE.MathUtils.lerp(12.5, 8.6, seg(p, 0, 0.5)) * zoomOut;
    target.set(x * 0.2, y * 0.15, z);
    camera.position.lerp(target, 1 - Math.exp(-4 * dt));
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      {LAYERS.map((l, i) => (
        <LayerMesh key={i} layer={l} pRef={pRef} />
      ))}
      <Frame pRef={pRef} />
      <Knot pRef={pRef} />
    </group>
  );
}

export default function StoryScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <LazyCanvas className="absolute inset-0" camera={{ position: [0, 0, 12.5], fov: 36 }}>
      <color attach="background" args={["#0b1812"]} />
      <fog attach="fog" args={["#0b1812", 10, 24]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 8, 7]} angle={0.5} penumbra={1} intensity={70} color="#f1dfae" />
      <pointLight position={[-7, -4, 5]} intensity={20} color="#8fb59a" />
      <Studio />
      <Rig progress={progress} />
      <GoldDust count={140} scale={[20, 12, 10]} size={2.2} speed={0.2} />
    </LazyCanvas>
  );
}
