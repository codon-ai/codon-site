import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/src/assets/dna.glb";

export function DnaModel() {
  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const { scene } = useGLTF(MODEL_PATH);

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
          color: "#0000FF",
          roughness: 0,
          metalness: 0,
        });
      }
    });

    nodesToRemove.forEach((node) => node.parent?.remove(node));
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current || !textGroupRef.current) return;

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
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive
        object={processedModel}
        scale={[0.0025, 0.0025, 0.0025]}
        rotation={[0, 0, Math.PI / 2]}
        renderOrder={1}
      />
      <group ref={textGroupRef} position={[0, 0, 0]}>
        <Text
          position={[2, 1.5, 0]}
          fontSize={0.4}
          color="black"
          anchorX="left"
          anchorY="middle"
          material-depthTest={false}
          renderOrder={1}
        >
          1st
        </Text>
        <Text
          position={[-2, -1, 1]}
          fontSize={0.3}
          color="black"
          anchorX="right"
          anchorY="middle"
          material-depthTest={false}
          renderOrder={1}
        >
          LLM + Codon Implementation:
        </Text>
        <Text
          position={[0, -2.5, 1.5]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
          material-depthTest={false}
          renderOrder={1}
        >
          Comparison:
        </Text>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);