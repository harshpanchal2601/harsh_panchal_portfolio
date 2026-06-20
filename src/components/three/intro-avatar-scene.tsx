"use client";

import { useEffect, useRef, Component, ReactNode } from "react";
import * as THREE from "three";

function useAvatarScene(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 300;
    const h = container.clientHeight || 420;

    // ── Scene ────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // Wide FOV + big far plane so nothing ever gets clipped
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.01, 2000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // ── Renderer — transparent ───────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    Object.assign(renderer.domElement.style, {
      background: "transparent",
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    container.style.position = "relative";
    container.appendChild(renderer.domElement);

    // ── Lights ───────────────────────────────────────────────
    // Very bright ambient so dark GLB materials still show
    scene.add(new THREE.AmbientLight(0xffffff, 4.0));
    const fl = new THREE.DirectionalLight(0xffffff, 5.0);
    fl.position.set(0, 1, 8);
    scene.add(fl);
    const tl = new THREE.DirectionalLight(0xffffff, 2.5);
    tl.position.set(0, 10, 2);
    scene.add(tl);
    const ll = new THREE.DirectionalLight(0xd7c7a3, 1.5);
    ll.position.set(-6, 2, 4);
    scene.add(ll);
    const rl = new THREE.DirectionalLight(0x6d5ef6, 0.8);
    rl.position.set(6, 2, 4);
    scene.add(rl);

    // ── Avatar state ─────────────────────────────────────────
    let avatarGroup: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let animFrameId: number;
    const clock = new THREE.Clock();
    let elapsed = 0;
    let flipDone = false;
    let targetRotY = 0;

    // Shadow disc (shown once model is placed)
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      new THREE.MeshStandardMaterial({ color: 0x6d5ef6, transparent: true, opacity: 0.08 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.visible = false;
    scene.add(ground);

    // ── Place avatar + reposition camera to fit ───────────────
    const placeAndFit = (group: THREE.Group) => {
      // Compute world-space bounding box
      const box = new THREE.Box3().setFromObject(group);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Guard: if model has no geometry, bail out
      if (size.y === 0) return;

      // Center model at origin
      group.position.set(-center.x, -center.y, -center.z);

      // Scale uniformly so model is exactly 1.8 world-units tall
      const TARGET_HEIGHT = 1.8;
      const uniformScale = TARGET_HEIGHT / size.y;
      group.scale.setScalar(uniformScale);

      // After scaling, shift up/down so model bottom sits at y = -0.9
      group.position.y = -0.9;

      // Place shadow at model feet
      ground.position.y = -0.9;
      ground.scale.setScalar(size.x * uniformScale * 0.6);
      ground.visible = true;

      // Camera: fixed at z=4.0, looking at y=0 (model center is at y=0)
      // With FOV=55 and z=4.0 visible height = 2*tan(27.5°)*4 = 4.15 units
      // Model 1.8 units → ~43% of height (centred + good breathing room)
      camera.position.set(0, 0, 4.0);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    // ── Procedural fallback avatar ────────────────────────────
    const buildFallback = (): THREE.Group => {
      const g = new THREE.Group();
      const sk = new THREE.MeshPhongMaterial({ color: 0xf5c5a3 });
      const sh = new THREE.MeshPhongMaterial({ color: 0x6d5ef6 });
      const pa = new THREE.MeshPhongMaterial({ color: 0x1e1b4b });
      const so = new THREE.MeshPhongMaterial({ color: 0x2d1b0e });

      const mk = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, name?: string) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        if (name) m.name = name;
        g.add(m);
        return m;
      };

      mk(new THREE.SphereGeometry(0.18, 16, 16), sk, 0, 1.62, 0);
      mk(new THREE.BoxGeometry(0.36, 0.44, 0.16), sh, 0, 1.18, 0);
      mk(new THREE.BoxGeometry(0.1, 0.38, 0.1), sh, -0.23, 1.1, 0, "lA");
      mk(new THREE.BoxGeometry(0.1, 0.38, 0.1), sh, 0.23, 1.1, 0, "rA");
      mk(new THREE.BoxGeometry(0.13, 0.42, 0.13), pa, -0.09, 0.7, 0, "lL");
      mk(new THREE.BoxGeometry(0.13, 0.42, 0.13), pa, 0.09, 0.7, 0, "rL");
      mk(new THREE.BoxGeometry(0.14, 0.07, 0.22), so, -0.09, 0.46, 0.04);
      mk(new THREE.BoxGeometry(0.14, 0.07, 0.22), so, 0.09, 0.46, 0.04);
      return g;
    };

    // ── Load GLB ─────────────────────────────────────────────
    const loadGLB = async () => {
      try {
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
        const loader = new GLTFLoader();
        loader.load(
          "/models/Walking.glb",
          (gltf) => {
            avatarGroup = gltf.scene;

            // Make all mesh materials visible regardless of original values
            avatarGroup.traverse((node) => {
              if (!(node as THREE.Mesh).isMesh) return;
              const mesh = node as THREE.Mesh;
              const mats = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];
              mats.forEach((m) => {
                if (m instanceof THREE.MeshStandardMaterial) {
                  m.roughness = 0.55;
                  m.metalness = 0.05;
                  m.needsUpdate = true;
                } else if (m instanceof THREE.MeshPhongMaterial) {
                  m.shininess = 40;
                  m.needsUpdate = true;
                }
              });
            });

            scene.add(avatarGroup);
            placeAndFit(avatarGroup);

            if (gltf.animations.length > 0) {
              mixer = new THREE.AnimationMixer(avatarGroup);
              const clip =
                THREE.AnimationClip.findByName(gltf.animations, "Walk") ||
                THREE.AnimationClip.findByName(gltf.animations, "walk") ||
                THREE.AnimationClip.findByName(gltf.animations, "Walking") ||
                gltf.animations[0];
              mixer.clipAction(clip).play();
            }
          },
          undefined,
          (_err) => {
            // GLB failed — use procedural fallback
            avatarGroup = buildFallback();
            scene.add(avatarGroup);
            placeAndFit(avatarGroup);
          }
        );
      } catch {
        avatarGroup = buildFallback();
        scene.add(avatarGroup);
        placeAndFit(avatarGroup);
      }
    };
    loadGLB();

    // ── Mouse tilt ───────────────────────────────────────────
    const onMouse = (e: MouseEvent) => {
      targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 0.45;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Animation loop ───────────────────────────────────────
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsed += delta;

      if (mixer) mixer.update(delta);

      if (avatarGroup) {
        if (!flipDone && elapsed < 1.2) {
          // Entry flip
          avatarGroup.rotation.y = (elapsed / 1.2) * Math.PI * 2;
        } else {
          flipDone = true;
          // Idle sway + mouse follow
          const sway = Math.sin(elapsed * 0.35) * 0.1;
          avatarGroup.rotation.y +=
            (targetRotY + sway - avatarGroup.rotation.y) * 0.04;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, [containerRef]);
}

// ── Error Boundary ───────────────────────────────────────────
interface EBState { hasError: boolean }
class AvatarErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError)
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-20 w-20 animate-pulse rounded-full bg-primary/20" />
        </div>
      );
    return this.props.children;
  }
}

function AvatarCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  useAvatarScene(ref);
  return (
    <div
      ref={ref}
      className="h-full w-full"
      style={{ background: "transparent" }}
    />
  );
}

export function Intro3DAvatarScene() {
  return (
    <AvatarErrorBoundary>
      <AvatarCanvas />
    </AvatarErrorBoundary>
  );
}
