import { Float, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";
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

function Screens() {
  return (
    <group>
      {/* Back glass panel */}
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <group position={[0.6, 0.2, -1.4]} rotation={[0.05, -0.45, 0.02]}>
          <RoundedBox args={[4.6, 3, 0.08]} radius={0.14} smoothness={6}>
            <GreenGlassMaterial opacity={0.9} color={PALETTE.emerald} />
          </RoundedBox>
          {/* gold frame line */}
          <RoundedBox args={[4.72, 3.12, 0.02]} radius={0.16} smoothness={6} position={[0, 0, -0.05]}>
            <GoldMaterial roughness={0.3} />
          </RoundedBox>
        </group>
      </Float>

      {/* Mid ivory panel — "design canvas" */}
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[-0.4, -0.15, 0.1]} rotation={[-0.03, -0.35, -0.02]}>
          <RoundedBox args={[3.6, 2.3, 0.1]} radius={0.12} smoothness={6}>
            <IvoryMaterial />
          </RoundedBox>
          {/* UI blocks */}
          <RoundedBox args={[1.5, 0.16, 0.04]} radius={0.04} position={[-0.85, 0.75, 0.08]}>
            <GoldMaterial />
          </RoundedBox>
          <RoundedBox args={[2.6, 0.08, 0.03]} radius={0.02} position={[-0.3, 0.42, 0.08]}>
            <meshStandardMaterial color="#c9bda0" roughness={0.6} />
          </RoundedBox>
          <RoundedBox args={[2.1, 0.08, 0.03]} radius={0.02} position={[-0.55, 0.22, 0.08]}>
            <meshStandardMaterial color="#c9bda0" roughness={0.6} />
          </RoundedBox>
          <RoundedBox args={[1.0, 0.7, 0.05]} radius={0.06} position={[-1.1, -0.5, 0.08]}>
            <GreenGlassMaterial opacity={1} color={PALETTE.forestLight} />
          </RoundedBox>
          <RoundedBox args={[1.0, 0.7, 0.05]} radius={0.06} position={[0.05, -0.5, 0.08]}>
            <GreenGlassMaterial opacity={1} color={PALETTE.forest} />
          </RoundedBox>
          <RoundedBox args={[1.0, 0.7, 0.05]} radius={0.06} position={[1.2, -0.5, 0.08]}>
            <GoldMaterial roughness={0.35} />
          </RoundedBox>
        </group>
      </Float>

      {/* Front small glass card */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.9}>
        <group position={[2.3, -1.1, 1.2]} rotation={[0.1, -0.5, 0.12]}>
          <RoundedBox args={[1.7, 1.1, 0.08]} radius={0.1} smoothness={6}>
            <GreenGlassMaterial opacity={0.85} color={PALETTE.forestLight} />
          </RoundedBox>
          <mesh position={[-0.45, 0.25, 0.08]}>
            <circleGeometry args={[0.16, 32]} />
            <GoldMaterial />
          </mesh>
          <RoundedBox args={[0.9, 0.07, 0.03]} radius={0.02} position={[0.1, 0.25, 0.08]}>
            <meshStandardMaterial color={PALETTE.ivory} roughness={0.5} />
          </RoundedBox>
          <RoundedBox args={[1.3, 0.07, 0.03]} radius={0.02} position={[0, -0.1, 0.08]}>
            <meshStandardMaterial color={PALETTE.ivory} roughness={0.5} />
          </RoundedBox>
        </group>
      </Float>
    </group>
  );
}

function Jewels() {
  const knot = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (knot.current) {
      knot.current.rotation.x += dt * 0.25;
      knot.current.rotation.y += dt * 0.35;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.15;
      ring.current.rotation.x = Math.sin(t * 0.3) * 0.3 + 0.9;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.1;
      ring2.current.rotation.y = Math.cos(t * 0.25) * 0.4 + 0.5;
    }
  });
  return (
    <group>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={1.1}>
        <mesh ref={knot} position={[-3.2, 1.6, 0.4]} scale={0.55}>
          <torusKnotGeometry args={[0.8, 0.26, 220, 32, 2, 3]} />
          <GoldMaterial roughness={0.16} />
        </mesh>
      </Float>
      {/* Large thin halo */}
      <mesh ref={ring} position={[0.5, 0.1, -0.6]}>
        <torusGeometry args={[3.9, 0.025, 16, 200]} />
        <GoldMaterial roughness={0.25} emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={ring2} position={[0.5, 0.1, -0.6]}>
        <torusGeometry args={[4.6, 0.012, 12, 200]} />
        <meshStandardMaterial
          color={PALETTE.goldLight}
          metalness={1}
          roughness={0.3}
          transparent
          opacity={0.55}
        />
      </mesh>
      {/* Spheres */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1.4}>
        <mesh position={[3.4, 1.9, 0.2]} scale={0.34}>
          <sphereGeometry args={[1, 64, 64]} />
          <GoldMaterial roughness={0.12} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0} floatIntensity={1.2}>
        <mesh position={[-2.6, -1.7, 0.9]} scale={0.22}>
          <sphereGeometry args={[1, 48, 48]} />
          <GreenGlassMaterial opacity={1} color={PALETTE.forestLight} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0} floatIntensity={1.6}>
        <mesh position={[1.4, 2.2, 1.4]} scale={0.12}>
          <sphereGeometry args={[1, 32, 32]} />
          <GoldMaterial roughness={0.1} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[-1.4, -2.2, -0.3]} scale={0.5} rotation={[0.4, 0.3, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <GreenGlassMaterial opacity={0.95} color={PALETTE.emerald} />
        </mesh>
      </Float>
    </group>
  );
}

function Rig({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((state, dt) => {
    const p = progress.get();
    const { x, y } = state.pointer;
    const mobile = state.size.width < 1024;
    if (group.current) {
      const g = group.current;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.18 + p * 0.9, 2.5, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.12 + p * 0.25, 2.5, dt);
      g.position.y = THREE.MathUtils.damp(g.position.y, p * 2.2, 3, dt);
      const s = (1 - p * 0.25) * (mobile ? 0.72 : 1);
      g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 3, dt));
    }
    if (inner.current) {
      // on wide screens the composition frames the portrait on the right
      inner.current.position.x = THREE.MathUtils.damp(
        inner.current.position.x,
        mobile ? 0 : 2.4,
        3,
        dt,
      );
      inner.current.position.y = THREE.MathUtils.damp(
        inner.current.position.y,
        mobile ? 1.6 : 0.1,
        3,
        dt,
      );
    }
    target.current.set(x * 0.35, y * 0.25 - p * 1.2, 9 + p * 1.5);
    camera.position.lerp(target.current, 1 - Math.exp(-2.5 * dt));
    camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={group}>
      <group ref={inner} position={[2.4, 0.1, 0]}>
        <Screens />
        <Jewels />
      </group>
    </group>
  );
}

export default function HeroScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <LazyCanvas className="absolute inset-0" camera={{ position: [0, 0, 9], fov: 38 }}>
      <fog attach="fog" args={["#0b1812", 9, 20]} />
      <ambientLight intensity={0.25} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.5}
        penumbra={1}
        intensity={60}
        color="#f1dfae"
        castShadow={false}
      />
      <pointLight position={[-6, -3, 4]} intensity={18} color="#8fb59a" />
      <Studio />
      <Rig progress={progress} />
      <GoldDust count={160} scale={[18, 10, 8]} size={2.4} />
    </LazyCanvas>
  );
}
