import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

const Moon = React.memo(() => {
  const moonRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const [moonTexture] = useTexture(["/assets/moon_map.jpg"]);

  const updateMoonPosition = useCallback(() => {
    // orbit rotation
    /*  moonRef.current.position.x = 3 * Math.cos(0.0015 * Date.now());
    moonRef.current.position.z = 3 * Math.sin(0.0015 * Date.now()); */
    moonRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.2) * 2.5; // speed 0.2, far 2.5
    moonRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.2) * 2.5; // speed 0.2, far 2.5

    // axis rotation
    moonRef.current.rotation.y += 0.002;
  }, []);

  useFrame(() => {
    updateMoonPosition();
  });

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[3, 0, 0]}>
      {/* radius, x-axis width, y-axis height */}
      <sphereGeometry args={[0.5, 37, 37]} />
      <meshPhongMaterial
        map={moonTexture}
        emissiveMap={moonTexture}
        emissive={0xffffff}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
});

export default Moon;
