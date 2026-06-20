"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeJsBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || window.innerWidth / 2;
    const height = mountRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // ── MINIMAL TRANSPARENT PARTICLES ───────────────────────
    const PARTICLE_COUNT = 350;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: { vx: number; vy: number; vz: number }[] = [];

    // Soft, transparent palette — navy tones only
    const palette = [
      new THREE.Color(0x0b1f3a), // Navy
      new THREE.Color(0x183b66), // Mid navy
      new THREE.Color(0x405f8d), // Muted blue
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      velocities.push({
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        vz: (Math.random() - 0.5) * 0.002,
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.35, // Very transparent
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── VERY FAINT LINES ────────────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({ color: 0x183b66, transparent: true, opacity: 0.05 });
    for (let i = 0; i < 12; i++) {
      const p1 = new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
      const p2 = new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      scene.add(new THREE.Line(lineGeo, lineMat));
    }

    // ── MOUSE PARALLAX ───────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── ANIMATION LOOP ────────────────────────────────────────
    let rafId: number;
    const posArr = geo.attributes.position.array as Float32Array;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        posArr[i3]     += velocities[i].vx;
        posArr[i3 + 1] += velocities[i].vy;
        posArr[i3 + 2] += velocities[i].vz;
        if (Math.abs(posArr[i3])     > 7)  velocities[i].vx *= -1;
        if (Math.abs(posArr[i3 + 1]) > 5)  velocities[i].vy *= -1;
        if (Math.abs(posArr[i3 + 2]) > 3)  velocities[i].vz *= -1;
      }
      geo.attributes.position.needsUpdate = true;

      // Gentle mouse tilt
      points.rotation.y += (mouseX * 0.2  - points.rotation.y) * 0.02;
      points.rotation.x += (-mouseY * 0.15 - points.rotation.x) * 0.02;
      points.rotation.z += 0.0002;

      renderer.render(scene, camera);
    };
    animate();

    // ── RESIZE ───────────────────────────────────────────────
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
