import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import laptop from "./assets/laptop.png";
import video from "./assets/video.mp4";
// Drei maps the scroll container's full scroll range to offset 0..1 and moves the
// HTML layer by (pages - 1) * canvasHeight * offset. So page i is centered exactly
// when offset = i / (pages - 1). These helpers use that same mapping, so scroll
// targets always agree with where drei actually draws the pages, whatever the
// container's real scrollHeight is.
const maxScroll = (el: HTMLElement) =>
  Math.max(1, el.scrollHeight - el.clientHeight);

const scrollTopForPage = (el: HTMLElement, pages: number, index: number) =>
  (index / Math.max(1, pages - 1)) * maxScroll(el);

const pageFromScroll = (el: HTMLElement, pages: number) =>
  Math.round((el.scrollTop / maxScroll(el)) * (pages - 1));

// Forces the scroll container to move exactly one page per gesture
// (wheel, touch swipe, arrow / PageUp / PageDown / Space keys).
function PageSnapper() {
  const scroll = useScroll();

  useEffect(() => {
    const el = scroll.el;
    if (!el) return;

    const pages = scroll.pages;
    let animating = false;
    let lastWheel = 0;
    let touchStartY = 0;

    // Programmatic scrolling still works with overflow hidden,
    // so this disables native free-scrolling.
    el.style.overflow = "hidden";

    const currentPage = () => pageFromScroll(el, pages);

    const goTo = (index: number) => {
      const target = Math.max(0, Math.min(pages - 1, index));
      animating = true;
      el.scrollTo({
        top: scrollTopForPage(el, pages, target),
        behavior: "smooth",
      });
      window.setTimeout(() => (animating = false), 900);
    };

    const step = (dir: number) => {
      if (animating) return;
      goTo(currentPage() + dir);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      // Ignore trackpad inertia: only react to a fresh gesture
      const fresh = now - lastWheel > 120;
      lastWheel = now;
      if (animating || !fresh || Math.abs(e.deltaY) < 4) return;
      step(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => e.preventDefault();
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(1);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [scroll]);

  return null;
}

// Manages HTML content and programmatic scrolling
function HtmlPages() {
  const scroll = useScroll();
  // Drei scrolls by exactly one canvas height per page, so each page is that tall.
  const pageHeight = useThree((state) => state.size.height);

  // ---- Carousel (page 2) ----
  const CAROUSEL_PAGE = 1; // zero-based index of the page holding the carousel
  const cards = [
    { title: "What is Codon?", body: "Codon is a radical JS flavour that prioritises token efficiency above all else. It is inspired by J, an array based programming language with mathematically compact properties. It is a language with evolution at its core, leveraging continual statistical analysis of other languages and self-analysis to shrink token count." },
    { title: "How does it work?", body: "Just like the three base pairs that make up a codon, we utilise a three-pronged strategy for maximum token-efficiency: the unintuitive non-Javascript philosophy, statistical fingerprinting of modules in written Javascript, and an iterative adversarial network that continually fine-tunes design decisions." },
    { title: "What is its impact?", body: "Codon is a project that is inherently designed with its own continual evolution in mind. Beyond its daily syntactical micro-iterations, we plan to severe Codon's ties to Javascript and eventually expand the standard to have equivalent representations in all of the largest languages in the world such as Python, C++, and Rust. Additionally, we plan to fine-tune Gemini to write Codon at an expert level without wasting tokens reading the Codon codebase or documentation." },
  ];
  const n = cards.length;
  const [active, setActive] = useState(0); // index of the card in the center

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      // Only rotate while the carousel page is the one on screen
      const el = scroll.el;
      if (!el || pageFromScroll(el, scroll.pages) !== CAROUSEL_PAGE) return;

      e.preventDefault();
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % n);
      else setActive((a) => (a - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scroll, n]);

  // Left, center, right. At the start (active = 0) this gives:
  // [card 3, card 1, card 2] -> "What is Codon?" is in the middle.
  const ordered = [-1, 0, 1].map((slot) => cards[(active + slot + n) % n]);

  // The navbar is position: fixed, so it covers the top of every page. Pad the
  // top by its height so flex centering centers within the visible area.
  const pageStyle: React.CSSProperties = {
    height: pageHeight,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    position:"relative",
  };

  return (
    <Scroll html style={{ width: "100%" }}>
      {/* Page 1 */}
      <div style={pageStyle}>
        {/* Set pointerEvents: 'auto' on interactive elements so you can still click them over the canvas */}
        <div style={{ pointerEvents: "auto", padding: "2rem", borderRadius: "8px", transform:"translateY(-50px)",}}>
          <h1 style={{ fontSize: "128px", fontFamily: "Host Grotesk", fontWeight: "400" }}>
            Introducing{" "}
            <span style={{ fontWeight: "400", fontFamily: "Instrument Serif", fontStyle: "normal" }}>
              Codon
            </span>
          </h1>
        </div>
      </div>

      {/* Page 2 - rotating cards */}
      <div style={pageStyle} className="cardContainer">
        {ordered.map((c) => (
          <div className="card" key={c.title}>
            <h1>{c.title}</h1><br />
            <p>{c.body}</p>
          </div>
        ))}
      </div>

      {/* Page 3 */}
      <div style={pageStyle}>
        <div id="page3" style={{alignContent:"center"}}>
          <h1 style={{textShadow:"0 4px 4px #6ACEF6", fontSize:"150px", textAlign:"center", fontFamily:"Host Grotesk",margin:0}}><span style={{fontFamily:"Instrument Serif",fontWeight: "400"}}>Codon</span></h1>
          <h3 style={{fontFamily:"Instrument Serif",fontSize:"100px",fontWeight:400,textAlign:"center",margin:0}}>Iterative</h3>
          <h1 style={{fontSize:"150px", textAlign:"center", fontWeight:400, fontFamily:"Host Grotesk",margin:0}}>Improvement</h1>
          </div>        
      </div>
      {/* Page 4 */}
      <div style={pageStyle}>
        <div
          style={{
            width: "90%",
            position: "relative",
            display: "inline-block",
          }}
        >
          <img
            src={laptop}
            alt="laptop"
            style={{
              width: "100%",
              display: "block",
            }}
          />
          <video src={video} autoPlay loop muted style={{
            position: "absolute",
            top: 643,
            left: 189,
            width: 1211,
            height: 759,
            objectFit: "cover",
            objectPosition: "left",
            opacity: 1
          }} />
        </div>
      </div>
    </Scroll>
  );
}

function DnaModel() {
  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const gl = useThree((state) => state.gl);

  // Horizontal clip plane: keeps everything with y >= -constant
  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 6),
    []
  );

  useEffect(() => {
    gl.clippingPlanes = [clipPlane];
    return () => {
      gl.clippingPlanes = [];
    };
  }, [gl, clipPlane]);

  const { scene } = useGLTF("/src/assets/dna.glb");

  const processedModel = useMemo(() => {
    const clone = scene.clone(true);
    const nodesToRemove: THREE.Object3D[] = [];

    clone.traverse((child) => {
      if ((child as any).isLight) {
        (child as any).intensity = 0;
        child.visible = false;
        nodesToRemove.push(child);
        return;
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry && mesh.geometry.attributes.color) {
          mesh.geometry.deleteAttribute("color");
        }

        mesh.material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 0.5,
          metalness: 0,
        });
      }
    });

    nodesToRemove.forEach((node) => node.parent?.remove(node));
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current && textGroupRef.current) {
      // ---- Clip the DNA based on which page we're on ----
      // p = 0..3 (page index, fractional while scrolling)
      const p = scroll.offset * (scroll.pages - 1);
      const OFFSCREEN = 6; // beyond the visible half-height (~3.7 at z=8, fov=50)

      let clipY: number;
      if (p <= 1) {
        // pages 1-2: nothing clipped
        clipY = -OFFSCREEN;
      } else if (p <= 2) {
        // page 2 -> 3: plane rises from below the screen to the center
        clipY = THREE.MathUtils.lerp(-OFFSCREEN, 0, p - 1);
      } else {
        // page 3 -> 4: plane continues up past the top of the screen
        clipY = THREE.MathUtils.lerp(0, OFFSCREEN, p - 2);
      }
      // plane keeps points where y + constant >= 0  =>  y >= -constant
      clipPlane.constant = -clipY;

      // ---- Existing animation ----
      const t = state.clock.getElapsedTime();

      const scrollRotY = scroll.offset * Math.PI * 10;

      const ambientRotX = Math.sin(t * 0.5) * 0.05;
      const ambientRotY = Math.cos(t * 0.4) * 0.05;
      const ambientPosY = Math.sin(t * 0.8) * 0.1;

      const mouseRotX = -state.pointer.y * 0.15;
      const mouseRotY = state.pointer.x * 0.15;
      const mousePosX = state.pointer.x * 0.2;
      const mousePosY = state.pointer.y * 0.2;

      groupRef.current.rotation.y = scrollRotY + ambientRotY + mouseRotY;
      groupRef.current.rotation.x = ambientRotX + mouseRotX;

      groupRef.current.position.x = mousePosX;
      groupRef.current.position.y = ambientPosY + mousePosY;

      textGroupRef.current.position.y = scrollRotY / 3;
    }
  });

  return (
    <>
      {/* Blue key light: top left, in front of the model */}
      <directionalLight position={[-5, 5, 5]} color="#254988" intensity={10} />

      {/* White: bottom right */}
      <directionalLight position={[5, -5, 5]} color="#ffffff" intensity={1} />

      {/* Soft white ambient lifts the shadows toward white instead of black */}
      <ambientLight intensity={0.35} color="#ffffff" />

      <group ref={groupRef} position={[0, 0, 0]}>
        <primitive
          object={processedModel}
          scale={[0.0025, 0.0025, 0.0025]}
          rotation={[0, 0, Math.PI / 2]}
          renderOrder={1}
        />
        <group ref={textGroupRef} position={[0, 0, 0]}>
          {/* ...your three <Text> elements unchanged... */}
        </group>
      </group>
    </>
  );
}

function Nucleotides() {
  const CODON_LEN = 3;
  const NUM_CODONS = 500;

  const [sequence, setSequence] = useState("");

  useEffect(function () {
    let codon = "";
    for (let i = 0; i < CODON_LEN * NUM_CODONS; i++)
      codon += "AGTC".at(Math.floor(Math.random() * 4));
    setSequence(codon);
  }, []);

  const rowText =
    new Array(NUM_CODONS)
      .fill(undefined)
      .map((_, i) => sequence.slice(i * CODON_LEN, (i + 1) * CODON_LEN))
      .join("   ") + "   ";

  return (
    <div className="wall-nucleotide">
      {new Array(50).fill(undefined).map((_, i) => (
        <span
          key={"r" + i}
          className={"row-nucleotide" + (i % 2 ? " reverse" : "")}
        >
          {rowText}
          {rowText}
        </span>
      ))}
    </div>
  );
}

useGLTF.preload("/src/assets/dna.glb");

export default function OverviewPage() {
  return (
    <div
      className="codon-scene-wrapper"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #fafafa;
        }
      `}</style>
      <Nucleotides />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.2}>
            <PageSnapper />
            <DnaModel />
            <HtmlPages />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}