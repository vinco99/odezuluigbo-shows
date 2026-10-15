"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";

// Serializable shape passed from a server component.
export type HeroEvent = {
  id: string;
  title: string;
  eventDate: string | null;          // ISO
  registrationStart: string | null;  // ISO
  registrationEnd: string | null;    // ISO
  voteSessions: { id: string; name: string; endsAt: string }[]; // ISO
};

type Milestone = {
  title: string;
  label: string;
  date: Date;
};

const MS_SECOND = 1000;
const MS_DAY = 86_400_000;

/** Flatten every future milestone from all events, sorted soonest-first. */
function computeMilestones(events: HeroEvent[], now: number): Milestone[] {
  const out: Milestone[] = [];

  const consider = (iso: string | null, label: string, eventTitle: string) => {
    if (!iso) return;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return;
    if (d.getTime() <= now) return;
    out.push({ title: eventTitle, label, date: d });
  };

  for (const e of events) {
    consider(e.registrationStart, "Registration opens", e.title);
    consider(e.registrationEnd, "Registration closes", e.title);
    for (const s of e.voteSessions ?? []) {
      consider(s.endsAt, `Voting ends · ${s.name}`, e.title);
    }
    consider(e.eventDate, "Event day", e.title);
  }

  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function diffParts(targetMs: number, nowMs: number) {
  const ms = Math.max(0, targetMs - nowMs);
  const totalSec = Math.floor(ms / MS_SECOND);
  const days = Math.floor(totalSec / 86_400);
  const hours = Math.floor((totalSec % 86_400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return { days, hours, mins, secs };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Hero({ events = [] }: { events?: HeroEvent[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ---------- COUNTDOWN ----------
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MS_SECOND);
    return () => clearInterval(id);
  }, []);

  const next = useMemo(() => {
    const list = computeMilestones(events, now);
    return list[0] ?? null;
  }, [events, now]);

  const remaining = next ? diffParts(next.date.getTime(), now) : null;

  // ---------- THREE.JS SCENE ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    // Lights
    scene.add(new THREE.AmbientLight(0x111111, 1));

    const goldLight = new THREE.PointLight(0xc9a84c, 4, 40);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const redLight = new THREE.PointLight(0xb22222, 2, 30);
    redLight.position.set(-8, -4, 3);
    scene.add(redLight);

    const blueLight = new THREE.DirectionalLight(0xffffff, 1.5);
    blueLight.position.set(0, 10, 10);
    scene.add(blueLight);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a84c,
      metalness: 1,
      roughness: 0.1,
      emissive: 0x3d2800,
      emissiveIntensity: 0.3,
    });

    const goldWireframe = new THREE.MeshStandardMaterial({
      color: 0xe8c96e,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const redMaterial = new THREE.MeshStandardMaterial({
      color: 0xb22222,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x3d0000,
      emissiveIntensity: 0.4,
    });

    // Torus knot
    const knotGeometry = new THREE.TorusKnotGeometry(2.5, 0.5, 180, 24, 2, 3);

    const knot = new THREE.Mesh(knotGeometry, goldMaterial);
    knot.position.set(5, 0, -2);
    scene.add(knot);

    const knotWire = new THREE.Mesh(knotGeometry, goldWireframe);
    knotWire.position.set(5, 0, -2);
    scene.add(knotWire);

    // Octahedron
    const oct = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.6, 1),
      goldMaterial
    );
    oct.position.set(-6, 2, -1);
    scene.add(oct);

    // Red sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      redMaterial
    );
    sphere.position.set(-5, -3, 1);
    scene.add(sphere);

    // Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(4.5, 0.06, 16, 120),
      new THREE.MeshStandardMaterial({
        color: 0xe8c96e,
        metalness: 1,
        roughness: 0.05,
        transparent: true,
        opacity: 0.5,
      })
    );
    ring1.position.copy(knot.position);
    ring1.rotation.x = Math.PI / 4;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(5.5, 0.04, 16, 120),
      new THREE.MeshStandardMaterial({
        color: 0xc9a84c,
        metalness: 1,
        roughness: 0.1,
        transparent: true,
        opacity: 0.3,
      })
    );
    ring2.position.copy(knot.position);
    ring2.rotation.x = -Math.PI / 5;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // Particles
    const count = 400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xc9a84c,
        size: 0.12,
        opacity: 0.7,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    // Orbs (tuple type so `position.set(...pos)` type-checks)
    const orbData: [number, number, number][] = [
      [-9, 4, -3],
      [8, -5, -5],
      [-3, -6, 2],
      [10, 3, -8],
      [-7, -2, -6],
      [3, 6, -4],
    ];

    const orbs = orbData.map((pos, i) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.18 + i * 0.05, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xc9a84c : 0xe8c96e,
          metalness: 1,
          roughness: 0.05,
          emissive: i % 2 === 0 ? 0x3d2800 : 0x5a3e00,
          emissiveIntensity: 0.6,
        })
      );
      m.position.set(...pos);
      scene.add(m);
      return {
        m,
        oy: pos[1],
        sp: 0.3 + Math.random() * 0.5,
        ph: Math.random() * Math.PI * 2,
      };
    });

    // Animation
    let animation = 0;
    let mx = 0,
      my = 0,
      tmx = 0,
      tmy = 0;

    const clock = new THREE.Clock();

    function animate() {
      animation = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      knot.rotation.x = t * 0.25 + my * 0.3;
      knot.rotation.y = t * 0.4 + mx * 0.3;

      knotWire.rotation.x = knot.rotation.x + 0.1;
      knotWire.rotation.y = knot.rotation.y - 0.05;

      oct.rotation.x = t * 0.5;
      oct.rotation.z = t * 0.3;

      const p = 1 + Math.sin(t * 2) * 0.1;
      sphere.scale.set(p, p, p);
      sphere.rotation.y = t * 0.6;

      ring1.rotation.z = t * 0.15;
      ring1.rotation.y = t * 0.08 + mx * 0.2;

      ring2.rotation.z = -t * 0.12;
      ring2.rotation.x = -Math.PI / 5 + my * 0.1;

      orbs.forEach((o, i) => {
        o.ph = (o.ph + o.sp * 0.01) % (Math.PI * 2);
        o.m.position.y = o.oy + Math.sin(o.ph) * 1.5;
        o.m.rotation.y = t * 0.5 * (i % 2 === 0 ? 1 : -1);
      });

      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.01;

      goldLight.position.x = Math.cos(t * 0.5) * 8;
      goldLight.position.z = Math.sin(t * 0.5) * 8;
      goldLight.position.y = Math.sin(t * 0.3) * 4;

      camera.position.x = mx * 1.5;
      camera.position.y = -my * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    function onMouseMove(e: MouseEvent) {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animation);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero">
      <canvas ref={canvasRef} id="hero-canvas" />

      <div
        id="hero-logo-watermark"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <img
          src="/images/logo.webp"
          alt="Odezuluigbo Shows"
          style={{
            width: "68%",
            maxWidth: "600px",
            objectFit: "contain",
            opacity: 0.9,
            filter: "drop-shadow(0 0 40px rgba(201,168,76,.5))",
          }}
        />
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>{" "}
          Africa&apos;s #1 Igbo Entertainment Platform
        </div>

        <h1 className="hero-title">
          <span className="t-line">ODEZULUIGBO</span>
          <span className="t-line accent">SHOWS</span>
        </h1>
        <p className="hero-tagline">Ka ọ si dị na Ala Igbo</p>
        <p className="hero-sub">
          Celebrating Igbo Culture · Talent · Beauty · Excellence
        </p>

        <div className="hero-btns">
          <Link href="/events" className="btn btn-gold">
            Explore Events
          </Link>
          <Link href="/vote" className="btn btn-outline">
            Vote Now
          </Link>
        </div>

        {/* ---------- DYNAMIC COUNTDOWN ---------- */}
        <div className="hero-cd">
          {next && remaining ? (
            <>
              <div className="cd-label">
                ⏳ {next.label}: {next.title} —{" "}
                {next.date.toLocaleString("en-NG", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="cd-timer">
                <div className="cd-unit">
                  <span id="cd-days">{pad(remaining.days)}</span>
                  <small>Days</small>
                </div>
                <div className="cd-sep">:</div>
                <div className="cd-unit">
                  <span id="cd-hours">{pad(remaining.hours)}</span>
                  <small>Hours</small>
                </div>
                <div className="cd-sep">:</div>
                <div className="cd-unit">
                  <span id="cd-mins">{pad(remaining.mins)}</span>
                  <small>Mins</small>
                </div>
                <div className="cd-sep">:</div>
                <div className="cd-unit">
                  <span id="cd-secs">{pad(remaining.secs)}</span>
                  <small>Secs</small>
                </div>
              </div>
            </>
          ) : (
            <div className="cd-label">
              ⏳ No upcoming events — check back soon
            </div>
          )}
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}