"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplash } from "@/context/splash-context";
import * as THREE from "three";

// ── Animated character types for the splash ────────────────
type Stage = "loading" | "walking" | "done";

// Walking stick figure using Three.js geometry (fallback when no GLB)
// or full GLB model when available at /models/avatar.glb
function useAvatarScene(canvasRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!canvasRef.current) return;

    const w = canvasRef.current.clientWidth;
    const h = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);

    // ── Lighting ─────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xf7f4ee, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 5, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // ── Try to load GLB, fall back to stylized figure ────────
    let mixer: THREE.AnimationMixer | null = null;
    let clock = new THREE.Clock();
    let avatarGroup: THREE.Group;
    let animFrameId: number;
    let walkT = 0;

    const buildFallbackAvatar = () => {
      avatarGroup = new THREE.Group();
      const navy = new THREE.MeshPhongMaterial({ color: 0x0b1f3a });
      const skin = new THREE.MeshPhongMaterial({ color: 0xf5cba7 });
      const white = new THREE.MeshPhongMaterial({ color: 0xffffff });

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), skin);
      head.position.y = 1.85;
      head.castShadow = true;
      avatarGroup.add(head);

      // Hair
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.23, 32, 16), navy);
      hair.position.set(0, 1.97, -0.02);
      hair.scale.set(1, 0.55, 1);
      avatarGroup.add(hair);

      // Body (suit jacket)
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.7, 16), navy);
      torso.position.y = 1.25;
      torso.castShadow = true;
      avatarGroup.add(torso);

      // Shirt white underneath
      const shirt = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.45), white);
      shirt.position.set(0, 1.25, 0.221);
      avatarGroup.add(shirt);

      // Tie
      const tie = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.35), new THREE.MeshPhongMaterial({ color: 0x183b66 }));
      tie.position.set(0, 1.2, 0.222);
      avatarGroup.add(tie);

      // Arms
      const armGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.55, 12);
      const leftArm = new THREE.Mesh(armGeo, navy);
      leftArm.position.set(-0.32, 1.22, 0);
      leftArm.name = "leftArm";
      avatarGroup.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, navy);
      rightArm.position.set(0.32, 1.22, 0);
      rightArm.name = "rightArm";
      avatarGroup.add(rightArm);

      // Pelvis
      const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.2, 16), navy);
      pelvis.position.y = 0.88;
      avatarGroup.add(pelvis);

      // Legs
      const legGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.65, 12);
      const leftLeg = new THREE.Mesh(legGeo, navy);
      leftLeg.position.set(-0.12, 0.5, 0);
      leftLeg.name = "leftLeg";
      avatarGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, navy);
      rightLeg.position.set(0.12, 0.5, 0);
      rightLeg.name = "rightLeg";
      avatarGroup.add(rightLeg);

      // Shoes
      const shoeGeo = new THREE.BoxGeometry(0.14, 0.08, 0.22);
      const shoeMat = new THREE.MeshPhongMaterial({ color: 0x4a2c17 });
      const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
      leftShoe.position.set(-0.12, 0.15, 0.04);
      avatarGroup.add(leftShoe);
      const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
      rightShoe.position.set(0.12, 0.15, 0.04);
      avatarGroup.add(rightShoe);

      avatarGroup.position.y = -0.8;
      scene.add(avatarGroup);
    };

    // Try GLB loader
    const tryLoadGLB = async () => {
      try {
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
        const loader = new GLTFLoader();
        loader.load(
          "/models/avatar.glb",
          (gltf) => {
            avatarGroup = gltf.scene;
            avatarGroup.scale.setScalar(1.4);
            avatarGroup.position.y = -0.8;
            scene.add(avatarGroup);

            if (gltf.animations.length > 0) {
              mixer = new THREE.AnimationMixer(avatarGroup);
              const walkClip = THREE.AnimationClip.findByName(gltf.animations, "Walk") || gltf.animations[0];
              mixer.clipAction(walkClip).play();
            }
          },
          undefined,
          () => buildFallbackAvatar()
        );
      } catch {
        buildFallbackAvatar();
      }
    };

    tryLoadGLB();

    // ── Ground shadow disc ───────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(0.8, 32),
      new THREE.MeshStandardMaterial({ color: 0x0b1f3a, transparent: true, opacity: 0.1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.8;
    scene.add(ground);

    // ── Animate ─────────────────────────────────────────────
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      walkT += delta;

      if (mixer) {
        mixer.update(delta);
      } else if (avatarGroup) {
        // Animate fallback limbs
        const swing = Math.sin(walkT * 4) * 0.35;
        const leftLeg = avatarGroup.getObjectByName("leftLeg");
        const rightLeg = avatarGroup.getObjectByName("rightLeg");
        const leftArm = avatarGroup.getObjectByName("leftArm");
        const rightArm = avatarGroup.getObjectByName("rightArm");
        if (leftLeg) leftLeg.rotation.x = swing;
        if (rightLeg) rightLeg.rotation.x = -swing;
        if (leftArm) leftArm.rotation.x = -swing * 0.6;
        if (rightArm) rightArm.rotation.x = swing * 0.6;

        // Body bob
        avatarGroup.position.y = -0.8 + Math.abs(Math.sin(walkT * 4)) * 0.04;
      }

      // Slow auto-rotate
      if (avatarGroup) {
        avatarGroup.rotation.y = Math.sin(walkT * 0.3) * 0.25;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (canvasRef.current?.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, [canvasRef]);
}

// ── Typewriter animated text ──────────────────────────────────
function TypewriterText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, 55);
    const cursorInterval = setInterval(() => setCursor(c => !c), 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, onDone]);

  return (
    <span>
      {displayed}
      <span className={cursor ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.15s" }}>|</span>
    </span>
  );
}

// ── Main Splash Screen Component ──────────────────────────────
export function SplashScreen() {
  const { isSplashActive, completeSplash } = useSplash();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("loading");
  const [showText, setShowText] = useState(false);
  const [textDone, setTextDone] = useState(false);
  useAvatarScene(canvasRef);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("walking"), 300);
    const t2 = setTimeout(() => setShowText(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!textDone) return;
    const t = setTimeout(() => {
      setStage("done");
      completeSplash();
    }, 700);
    return () => clearTimeout(t);
  }, [textDone, completeSplash]);

  const slices = Array.from({ length: 8 });

  return (
    <>
      {/* Shutter curtains */}
      <AnimatePresence>
        {isSplashActive && (
          <div className="fixed inset-0 z-[9997] flex flex-col pointer-events-none">
            {slices.map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-background pointer-events-auto"
                initial={{ x: 0 }}
                exit={{ x: i % 2 === 0 ? "-100vw" : "100vw" }}
                transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: i * 0.045 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 3D Avatar + Text overlay */}
      <AnimatePresence>
        {isSplashActive && (
          <motion.div
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {/* 3D Canvas */}
            <motion.div
              layoutId="avatar-container"
              className="w-56 h-64 md:w-72 md:h-80"
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={stage !== "loading" ? { scale: 1, rotate: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div ref={canvasRef} className="w-full h-full" />
            </motion.div>

            {/* Animated text below avatar */}
            <AnimatePresence>
              {showText && (
                <motion.div
                  className="text-center mt-4 px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p
                    className="font-headline-md text-primary tracking-wide"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif", fontSize: "clamp(1rem, 3vw, 1.5rem)" }}
                  >
                    <TypewriterText
                      text="Welcome to Harsh Panchal's Portfolio"
                      onDone={() => setTextDone(true)}
                    />
                  </p>
                  <motion.p
                    className="text-[#44474d] mt-2 text-sm tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: textDone ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Full Stack Developer · AWS · CI/CD
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
