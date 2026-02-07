'use client';

import { aiMlInfo } from '@/data/wings/aiml';
import { WingMember, WingProject } from '@/data/wings/types';
import { Line, Sparkles, Stars, Text } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiPlay,
  FiPause,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi';
import { LuBrainCircuit, LuCpu, LuRocket, LuScanLine } from 'react-icons/lu';
import { CatmullRomCurve3, Group, MathUtils, Mesh, Vector3 } from 'three';

type Stage = {
  id: number;
  short: string;
  title: string;
  summary: string;
  metric: string;
  color: string;
};

const stages: Stage[] = [
  {
    id: 0,
    short: 'DATA',
    title: 'Data Ingestion',
    summary:
      'Collect and curate structured + unstructured datasets with labeling pipelines and integrity checks.',
    metric: '42 datasets synchronized weekly',
    color: '#38bdf8',
  },
  {
    id: 1,
    short: 'TRAIN',
    title: 'Model Training',
    summary:
      'Run distributed experiments, hyperparameter sweeps, and architecture exploration for robust baselines.',
    metric: '310 tracked experiments in active cycle',
    color: '#f59e0b',
  },
  {
    id: 2,
    short: 'EVAL',
    title: 'Evaluation',
    summary:
      'Use explainability, reliability checks, and regression benchmarks before release gates.',
    metric: '95.7% regression suite pass-rate',
    color: '#34d399',
  },
  {
    id: 3,
    short: 'DEPLOY',
    title: 'Deployment',
    summary:
      'Ship low-latency APIs with observability, drift detection, and continuous retraining workflows.',
    metric: 'P95 inference latency: 84ms',
    color: '#f472b6',
  },
];

const stagePositions = [-5.5, -1.8, 1.8, 5.5] as const;

const setInteractiveCursor = () => {
  if (typeof document !== 'undefined') {
    document.body.style.cursor = 'pointer';
  }
};

const resetCursor = () => {
  if (typeof document !== 'undefined') {
    document.body.style.cursor = 'auto';
  }
};

function PipelineCameraRig({
  activeStage,
  burstId,
}: {
  activeStage: number;
  burstId: number;
}) {
  const { camera, pointer } = useThree();
  const shakeRef = useRef(0);
  const target = useRef(new Vector3());
  const lookAt = useRef(new Vector3(0, 0.3, 0));

  useEffect(() => {
    shakeRef.current = 0.3;
  }, [burstId]);

  useFrame((state, delta) => {
    const focusX = MathUtils.lerp(0, stagePositions[activeStage], 0.18);
    target.current.set(
      focusX + pointer.x * 0.75,
      4.4 + pointer.y * 0.45,
      11.5 + Math.sin(state.clock.elapsedTime * 0.35) * 0.2
    );

    camera.position.lerp(target.current, 0.06);
    shakeRef.current = Math.max(0, shakeRef.current - delta * 1.4);

    if (shakeRef.current > 0) {
      camera.position.x += (Math.random() - 0.5) * shakeRef.current * 0.4;
      camera.position.y += (Math.random() - 0.5) * shakeRef.current * 0.25;
    }

    lookAt.current.set(focusX + pointer.x * 0.25, 0.3 + pointer.y * 0.16, 0);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function StagePulse({
  activeStage,
  burstId,
}: {
  activeStage: number;
  burstId: number;
}) {
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const progressRef = useRef(1.3);

  useEffect(() => {
    progressRef.current = 0;
  }, [activeStage, burstId]);

  useFrame((_, delta) => {
    if (!ringA.current || !ringB.current) {
      return;
    }

    progressRef.current += delta * 1.2;
    const p = progressRef.current;

    const baseX = stagePositions[activeStage];
    ringA.current.position.x = baseX;
    ringB.current.position.x = baseX;

    const scaleA = 0.85 + Math.min(1.2, p) * 2.1;
    const scaleB = 1.1 + Math.min(1.2, p) * 2.6;
    ringA.current.scale.setScalar(scaleA);
    ringB.current.scale.setScalar(scaleB);

    const matA = ringA.current.material as any;
    const matB = ringB.current.material as any;
    matA.opacity = Math.max(0, 0.85 - p * 0.75);
    matB.opacity = Math.max(0, 0.6 - p * 0.65);
  });

  const color = stages[activeStage].color;

  return (
    <>
      <mesh ref={ringA} position={[stagePositions[activeStage], -1.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.2, 72]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} transparent opacity={0} />
      </mesh>

      <mesh ref={ringB} position={[stagePositions[activeStage], -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.16, 64]} />
        <meshStandardMaterial color="#e2e8f0" emissive="#93c5fd" emissiveIntensity={1.2} transparent opacity={0} />
      </mesh>
    </>
  );
}

function StageTower({
  stage,
  isActive,
  onSelect,
}: {
  stage: Stage;
  isActive: boolean;
  onSelect: (id: number) => void;
}) {
  const towerRef = useRef<Mesh>(null);
  const orbRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!towerRef.current || !orbRef.current || !ringRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    towerRef.current.rotation.y += 0.0035;
    orbRef.current.position.y = 1.2 + Math.sin(t * 2 + stage.id) * 0.25;
    orbRef.current.rotation.x += 0.03;
    orbRef.current.rotation.y += 0.02;

    ringRef.current.rotation.y += 0.014;
    ringRef.current.rotation.z += 0.009;
    ringRef.current.scale.setScalar(isActive ? 1.08 : hovered ? 0.98 : 0.9);
  });

  return (
    <group position={[stagePositions[stage.id], 0, 0]}>
      <mesh
        ref={towerRef}
        castShadow
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onSelect(stage.id);
        }}
        onPointerOver={() => {
          setHovered(true);
          setInteractiveCursor();
        }}
        onPointerOut={() => {
          setHovered(false);
          resetCursor();
        }}
      >
        <cylinderGeometry args={[0.55, 0.75, isActive ? 2.9 : 2.2, 26]} />
        <meshStandardMaterial
          color={isActive ? stage.color : '#1f2937'}
          emissive={isActive || hovered ? stage.color : '#0f172a'}
          emissiveIntensity={isActive ? 1.18 : hovered ? 0.7 : 0.25}
          roughness={0.4}
          metalness={0.35}
        />
      </mesh>

      <mesh ref={orbRef}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={stage.color}
          emissive={stage.color}
          emissiveIntensity={isActive ? 2.1 : 1}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={ringRef} position={[0, 0.95, 0]}>
        <torusGeometry args={[0.54, 0.03, 10, 80]} />
        <meshStandardMaterial
          color={stage.color}
          emissive={stage.color}
          emissiveIntensity={isActive ? 1.4 : 0.6}
          transparent
          opacity={0.75}
        />
      </mesh>

      <Text
        position={[0, -1.65, 0]}
        fontSize={0.24}
        anchorX="center"
        anchorY="middle"
        color={isActive ? '#f8fafc' : '#94a3b8'}
      >
        {stage.short}
      </Text>
    </group>
  );
}

function NeuralCloud({
  activeStage,
  burstId,
}: {
  activeStage: number;
  burstId: number;
}) {
  const groupRef = useRef<Group>(null);
  const energyRef = useRef(1);
  const nodes = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, index) => {
        const angle = (index / 34) * Math.PI * 2;
        const radius = 2 + Math.random() * 1.4;
        const x = Math.cos(angle) * radius;
        const y = -0.3 + Math.sin(angle * 1.8) * 0.9;
        const z = Math.sin(angle) * radius * 0.5;
        return new Vector3(x, y, z);
      }),
    []
  );

  useEffect(() => {
    energyRef.current = 2.1;
  }, [burstId]);

  const activeX = stagePositions[activeStage];

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    energyRef.current = Math.max(1, energyRef.current - delta * 0.7);

    groupRef.current.position.x += (activeX - groupRef.current.position.x) * 0.05;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25 * energyRef.current;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.08 * energyRef.current;
    groupRef.current.scale.setScalar(MathUtils.lerp(groupRef.current.scale.x, 1 + (energyRef.current - 1) * 0.08, 0.1));
  });

  return (
    <group ref={groupRef} position={[activeX, 1.15, -1.4]}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.toArray()}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? '#60a5fa' : '#34d399'}
            emissive={index % 2 === 0 ? '#60a5fa' : '#34d399'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {nodes.slice(0, 12).map((node, index) => {
        const target = nodes[(index * 2 + 7) % nodes.length];
        return (
          <Line
            key={`line-${index}`}
            points={[node, target]}
            color={index % 2 === 0 ? '#7dd3fc' : '#6ee7b7'}
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        );
      })}
    </group>
  );
}

function DataPacket({
  curve,
  speed,
  offset,
  color,
  burstId,
}: {
  curve: CatmullRomCurve3;
  speed: number;
  offset: number;
  color: string;
  burstId: number;
}) {
  const packetRef = useRef<Mesh>(null);
  const speedBoostRef = useRef(1);

  useEffect(() => {
    speedBoostRef.current = 2.2;
  }, [burstId]);

  useFrame((state, delta) => {
    if (!packetRef.current) {
      return;
    }

    speedBoostRef.current = Math.max(1, speedBoostRef.current - delta * 0.9);

    const t = (state.clock.elapsedTime * speed * speedBoostRef.current + offset) % 1;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    packetRef.current.position.copy(point);
    packetRef.current.lookAt(point.clone().add(tangent));

    const scalar = 1 + (speedBoostRef.current - 1) * 0.35;
    packetRef.current.scale.setScalar(scalar);
  });

  return (
    <mesh ref={packetRef} castShadow>
      <sphereGeometry args={[0.14, 14, 14]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

function PacketFlow({ burstId }: { burstId: number }) {
  const curves = useMemo(
    () => [
      new CatmullRomCurve3([
        new Vector3(-7.4, 0.6, -0.2),
        new Vector3(-4.3, 1.3, 0.7),
        new Vector3(-1.4, 0.8, -0.9),
        new Vector3(1.7, 1.2, 0.6),
        new Vector3(4.7, 0.7, -0.7),
        new Vector3(7.4, 1.1, 0.2),
      ]),
      new CatmullRomCurve3([
        new Vector3(-7.4, -0.1, 1),
        new Vector3(-4.8, 0.4, -1.2),
        new Vector3(-1.3, 0.2, 1.1),
        new Vector3(2, 0.4, -1.1),
        new Vector3(4.9, 0.1, 1),
        new Vector3(7.4, -0.1, -0.3),
      ]),
    ],
    []
  );

  return (
    <>
      {curves.map((curve, index) => (
        <Line
          key={`curve-${index}`}
          points={curve.getPoints(90)}
          color={index === 0 ? '#38bdf8' : '#34d399'}
          transparent
          opacity={0.33}
          lineWidth={1.5}
        />
      ))}

      <DataPacket curve={curves[0]} speed={0.08} offset={0.15} color="#facc15" burstId={burstId} />
      <DataPacket curve={curves[0]} speed={0.11} offset={0.5} color="#f97316" burstId={burstId} />
      <DataPacket curve={curves[0]} speed={0.07} offset={0.81} color="#f472b6" burstId={burstId} />
      <DataPacket curve={curves[1]} speed={0.1} offset={0.05} color="#34d399" burstId={burstId} />
      <DataPacket curve={curves[1]} speed={0.09} offset={0.45} color="#38bdf8" burstId={burstId} />
      <DataPacket curve={curves[1]} speed={0.12} offset={0.74} color="#c084fc" burstId={burstId} />
    </>
  );
}

function PipelineGround({ activeStage }: { activeStage: number }) {
  const glowRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!glowRef.current) {
      return;
    }

    const mat = glowRef.current.material as any;
    mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 1.3 + activeStage) * 0.07;
  });

  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#0b1120"
          emissiveIntensity={0.45}
          roughness={0.95}
        />
      </mesh>

      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[stagePositions[activeStage], -1.23, 0]}>
        <circleGeometry args={[1.3, 40]} />
        <meshStandardMaterial
          color={stages[activeStage].color}
          emissive={stages[activeStage].color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

function PipelineScene({
  activeStage,
  onStageSelect,
  burstId,
  cycleStage,
}: {
  activeStage: number;
  onStageSelect: (id: number) => void;
  burstId: number;
  cycleStage: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 4.3, 12], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      fallback={
        <div className="flex h-full items-center justify-center bg-slate-950 text-sm text-slate-200">
          WebGL unavailable on this device.
        </div>
      }
      onPointerMissed={cycleStage}
    >
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 12, 25]} />
      <ambientLight intensity={0.42} />
      <hemisphereLight intensity={0.35} groundColor="#020617" />
      <spotLight intensity={60} position={[0, 11, 6]} angle={0.4} penumbra={0.7} color="#f8fafc" />
      <pointLight intensity={48} position={[-6, 5, 0]} color="#38bdf8" />
      <pointLight intensity={48} position={[6, 4, 0]} color="#34d399" />

      <PipelineCameraRig activeStage={activeStage} burstId={burstId} />

      <Stars radius={28} depth={40} count={900} factor={2.4} fade speed={0.25} />
      <Sparkles size={4} scale={[20, 8, 10]} speed={0.45} count={120} color="#93c5fd" />

      <PipelineGround activeStage={activeStage} />
      <PacketFlow burstId={burstId} />
      <NeuralCloud activeStage={activeStage} burstId={burstId} />
      <StagePulse activeStage={activeStage} burstId={burstId} />

      {stages.map((stage) => (
        <StageTower
          key={stage.id}
          stage={stage}
          isActive={activeStage === stage.id}
          onSelect={onStageSelect}
        />
      ))}

      <Text
        position={[0, 3.1, -2.6]}
        fontSize={0.38}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        PIPELINE OBSERVATORY
      </Text>
    </Canvas>
  );
}

function MemberCard({ member }: { member: WingMember }) {
  return (
    <article className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 transition hover:border-slate-500">
      <div className="mb-3 flex items-center gap-3">
        <img
          src={member.image}
          alt={member.name}
          className="h-14 w-14 rounded-xl border border-white/15 object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="text-lg font-semibold text-slate-100">{member.name}</h4>
          <p className="text-xs uppercase tracking-[0.15em] text-slate-300/80">{member.role}</p>
        </div>
      </div>

      {member.bio && <p className="mb-3 text-sm text-slate-300/90">{member.bio}</p>}

      {member.tags && member.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-slate-100/80">
          {member.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-600/70 bg-slate-800/70 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 text-xs">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-2 py-1 text-cyan-100 hover:border-cyan-200"
          >
            <FiLinkedin /> LinkedIn
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-orange-300/40 bg-orange-400/10 px-2 py-1 text-orange-100 hover:border-orange-200"
          >
            <FiGithub /> GitHub
          </a>
        )}
        {member.portfolio && (
          <a
            href={member.portfolio}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-1 text-emerald-100 hover:border-emerald-200"
          >
            <FiExternalLink /> Portfolio
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: WingProject }) {
  const statusClasses =
    project.status === 'Live'
      ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200'
      : project.status === 'In Progress'
        ? 'border-amber-300/40 bg-amber-400/10 text-amber-200'
        : 'border-sky-300/40 bg-sky-400/10 text-sky-200';

  return (
    <article className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 transition hover:border-slate-500">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold text-slate-100">{project.title}</h4>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${statusClasses}`}>
          {project.status}
        </span>
      </div>
      <p className="mb-3 text-sm text-slate-300/90">{project.summary}</p>
      <div className="mb-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-slate-100/80">
        {project.stack.map((tool) => (
          <span key={tool} className="rounded-full border border-slate-600/70 bg-slate-800/70 px-2 py-1">
            {tool}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-cyan-200 hover:text-cyan-100"
        >
          Live Link <FiArrowRight />
        </a>
      )}
    </article>
  );
}

export default function AIMLWingClient({
  headingClassName,
  bodyClassName,
}: {
  headingClassName: string;
  bodyClassName: string;
}) {
  const [activeStage, setActiveStage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [burstId, setBurstId] = useState(0);

  const triggerBurst = () => {
    setBurstId((prev) => prev + 1);
  };

  const cycleStage = () => {
    setActiveStage((prev) => (prev + 1) % stages.length);
  };

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [autoPlay]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        triggerBurst();
        return;
      }
      if (event.key === 'ArrowRight') {
        setActiveStage((prev) => (prev + 1) % stages.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveStage((prev) => (prev - 1 + stages.length) % stages.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const stageProgress = ((activeStage + 1) / stages.length) * 100;

  return (
    <main className={`${bodyClassName} relative min-h-screen overflow-hidden bg-[#01040f] text-slate-100`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.13),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(52,211,153,0.14),transparent_30%)]" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 pb-12 pt-8 md:px-6 lg:gap-9 lg:pt-10">
        <header className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
              <LuBrainCircuit /> AI/ML Wing
            </p>
            <h1 className={`${headingClassName} text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-6xl`}>
              PIPELINE OBSERVATORY
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-200/90 md:text-base">
              {aiMlInfo.tagline} Enhanced with burst-reactive packet flow, adaptive camera rig, autoplay stage tour,
              and interactive towers. Controls: <span className="text-cyan-200">Arrow keys</span> switch stages,
              <span className="text-orange-200"> SPACE</span> triggers inference burst.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-sky-300/60 bg-sky-400/12 px-4 py-2 text-sky-100 transition hover:border-sky-200 hover:bg-sky-300/20"
            >
              {autoPlay ? <FiPause /> : <FiPlay />} {autoPlay ? 'Pause Autoplay' : 'Start Autoplay'}
            </button>
            <button
              type="button"
              onClick={triggerBurst}
              className="inline-flex items-center gap-2 rounded-xl border border-orange-300/60 bg-orange-400/15 px-4 py-2 text-orange-100 transition hover:border-orange-200 hover:bg-orange-300/25"
            >
              <FiZap /> Inference Burst
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-500/70 bg-slate-900/60 px-4 py-2 text-slate-100 transition hover:border-slate-300"
            >
              Back to Wings <FiArrowRight />
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-950/70 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="h-[430px] w-full md:h-[530px]">
              <PipelineScene
                activeStage={activeStage}
                onStageSelect={setActiveStage}
                burstId={burstId}
                cycleStage={cycleStage}
              />
            </div>
            <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-slate-400/30 bg-slate-900/70 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-slate-200/90 backdrop-blur-sm">
              Click tower or empty zone to cycle stage
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 backdrop-blur-sm">
              <h2 className={`${headingClassName} mb-3 text-lg uppercase tracking-[0.15em] text-slate-100`}>
                Pipeline Focus
              </h2>
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-slate-600/70 bg-slate-950/80 p-4"
              >
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-300/70">Stage {activeStage + 1}</p>
                <h3 className="mb-2 text-xl font-semibold text-slate-100">{stages[activeStage].title}</h3>
                <p className="mb-3 text-sm text-slate-300/90">{stages[activeStage].summary}</p>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  <FiTrendingUp /> {stages[activeStage].metric}
                </p>
              </motion.div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 backdrop-blur-sm">
              <h2 className={`${headingClassName} mb-3 text-lg uppercase tracking-[0.15em] text-slate-100`}>
                Stage Selector
              </h2>
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-700/70">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-emerald-300 to-fuchsia-400"
                  animate={{ width: `${stageProgress}%` }}
                  transition={{ duration: 0.28 }}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(stage.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      activeStage === stage.id
                        ? 'border-cyan-300/70 bg-cyan-500/10'
                        : 'border-slate-600/70 bg-slate-900/40 hover:border-slate-400'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-300/80">{stage.short}</p>
                    <p className="text-sm font-semibold text-slate-100">{stage.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 backdrop-blur-sm">
              <h2 className={`${headingClassName} mb-3 text-lg uppercase tracking-[0.15em] text-slate-100`}>
                Toolchain
              </h2>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide">
                {aiMlInfo.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-slate-600/70 bg-slate-800/75 px-3 py-1 text-slate-200/90">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-950/65 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className={`${headingClassName} text-2xl uppercase tracking-[0.12em] text-white`}>Coordinators</h3>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-wider text-sky-200">
              <LuCpu /> Wing Leadership
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {aiMlInfo.coordinators.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-950/65 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className={`${headingClassName} text-2xl uppercase tracking-[0.12em] text-white`}>Members</h3>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-wider text-emerald-200">
              <LuScanLine /> Research + Engineering
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aiMlInfo.members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-950/65 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className={`${headingClassName} text-2xl uppercase tracking-[0.12em] text-white`}>
              Featured Projects
            </h3>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-wider text-amber-200">
              <LuRocket /> Build in Public
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aiMlInfo.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
