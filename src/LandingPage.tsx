/*import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  useGLTF,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

function DnaModel() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const { scene } = useGLTF("/src/assets/dna.glb");

  // Synchronously clone & sanitize the model without mutating during traversal
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
          color: "#2e3239",
          roughness: 0.9,
          metalness: 0.0,
        });
      }
    });

    nodesToRemove.forEach((node) => node.parent?.remove(node));
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();

      const scrollRotY = scroll.offset * Math.PI * 8;

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
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive
        object={processedModel}
        scale={[0.0025, 0.0025, 0.0025]}
        rotation={[0, 0, Math.PI / 2]}
      />

      {
        3D Text Components: 
        Set to white with DifferenceBlending and depthTest=false. 
        This ensures even if the model passes IN FRONT of the 3D text, it inverts instead of being hidden!
      }
      <Text
        position={[2, 1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="left"
        anchorY="middle"
        material-blending={THREE.DifferenceBlending}
        material-depthTest={false}
        renderOrder={1}
      >
        Sequence
      </Text>
      <Text
        position={[-2, -1, 1]}
        fontSize={0.3}
        color="white"
        anchorX="right"
        anchorY="middle"
        material-blending={THREE.DifferenceBlending}
        material-depthTest={false}
        renderOrder={1}
      >
        Compile
      </Text>
      <Text
        position={[0, -2.5, 1.5]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-blending={THREE.DifferenceBlending}
        material-depthTest={false}
        renderOrder={1}
      >
        Execute
      </Text>
    </group>
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
        background: "#fafafa",
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

      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        <color attach="background" args={["#fafafa"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 6]} intensity={0.4} />
        <directionalLight
          position={[-5, -6, -4]}
          intensity={0.2}
          color="#a0b8d0"
        />

        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.2}>
            <DnaModel />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
*/
export default function LandingPage() {
  return (
    <div
      style={{
        width: 1527,
        height: 957,
        position: "relative",
        background: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 206,
          height: 48,
          left: 1303,
          top: 17,
          position: "absolute",
          background: "white",
        }}
      >
        <img
          style={{
            width: 206,
            height: 48,
            left: 0,
            top: 0,
            position: "absolute",
            borderRadius: 41,
          }}
          src="https://placehold.co/206x48"
        />
      </div>
      <div
        style={{
          padding: 10,
          left: 18,
          top: 5,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          display: "inline-flex",
        }}
      ></div>
      <div
        style={{
          width: 727,
          height: 107,
          left: 406,
          top: 166,
          position: "absolute",
        }}
      >
        <div
          style={{
            width: 727,
            height: 107,
            left: 0,
            top: 0,
            position: "absolute",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "black",
              fontSize: 96,
              fontFamily: "Host Grotesk",
              fontWeight: "400",
              wordWrap: "break-word",
              textShadow: "0px 4px 4px rgba(106, 206, 246, 1.00)",
            }}
          >
            Introducing
          </span>
          <span
            style={{
              color: "black",
              fontSize: 96,
              fontFamily: "Instrument Serif",
              fontWeight: "400",
              wordWrap: "break-word",
              textShadow: "0px 4px 4px rgba(106, 206, 246, 1.00)",
            }}
          >
            {" "}
            Codon
          </span>
        </div>
      </div>
      <div
        style={{
          left: -989,
          top: 465,
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 40,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            width: 678,
            height: 492,
            paddingTop: 56,
            paddingBottom: 329,
            paddingLeft: 75,
            paddingRight: 76,
            opacity: 0.5,
            background: "linear-gradient(180deg, white 0%, #254988 100%)",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 10,
            display: "flex",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 96,
              fontFamily: "Instrument Serif",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            HOW IT WORKS
          </div>
        </div>
        <div
          style={{
            width: 678,
            height: 492,
            paddingTop: 56,
            paddingBottom: 329,
            paddingLeft: 75,
            paddingRight: 76,
            opacity: 0.5,
            background: "linear-gradient(180deg, white 0%, #254988 100%)",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 10,
            display: "flex",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 96,
              fontFamily: "Instrument Serif",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            WHAT IT IS
          </div>
        </div>
        <div
          style={{
            width: 678,
            height: 492,
            paddingBottom: 329,
            paddingLeft: 75,
            paddingRight: 76,
            background: "linear-gradient(180deg, white 0%, #254988 100%)",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 10,
            display: "flex",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 96,
              fontFamily: "Instrument Serif",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            IMPACT
          </div>
        </div>
      </div>
    </div>
  );
}
