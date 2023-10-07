import { useGLTF } from "@react-three/drei";
import React, { useMemo, useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ISS = React.memo(() => {
  const issRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const memoizedISS = useMemo(() => {
    return useGLTF("/ISSModel/ISS_stationary.gltf");
  });

  const updateMoonPosition = useCallback(() => {
    // orbit rotation
    issRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.7) * 1.5; // speed 0.7, far 1.5
    issRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.7) * 1.5; // speed 0.7, far 1.5
  }, []);

  useFrame(() => {
    updateMoonPosition();
  });

  return (
    <mesh>
      <primitive
        ref={issRef}
        object={memoizedISS.scene}
        position={[2, 0, 0]}
        scale={0.005} // size
      />
    </mesh>
  );
});

export default ISS;
