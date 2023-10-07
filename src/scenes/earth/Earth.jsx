import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Moon from "./Moon";
import ISS from "./ISS";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js"; /* NEW */

const Earth = React.memo(({ displacementScale }) => {
  const earthRef = useRef();
  // Create a reference to the Earth's position vector
  /* const earthPositionRef = useRef(new THREE.Vector3(8, 0, 0));     NEW  */
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree(); /* NEW */
  const [hovered, hover] = useState(false);
  const [followingEarth, setFollowingEarth] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(
    /* NEW */
    new THREE.Vector3(17, 9, 19)
  );
  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0)
  ); /* NEW */

  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    "/assets/earth_day.jpg",
    "/assets/earth_normal.jpg",
    "/assets/earth_specular.jpg",
    "/assets/earth_displacement.jpg",
    "/assets/earth_night.jpg",
  ]);

  const updateEarthPosition = useCallback(() => {
    // calculate the Earth's position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.5;
    const distance = 13;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += 0.002;
  }, []);

  const toggleFollowingEarth = () => {
    setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame(({ camera }) => {
    updateEarthPosition();
    TWEEN.update(); /* NEW */

    const earthPositionRef = earthRef.current.position;

    if (followingEarth) {
      const cameraTargetPosition = new THREE.Vector3(
        earthPositionRef.x + 10,
        earthPositionRef.y + 2,
        earthPositionRef.z + 5
      );
      //Tween for camera position
      new TWEEN.Tween(cameraPosition) /* NEW */
        .to(cameraTargetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraPosition(cameraPosition);
        })
        .start();

      //Tween for camera targeting
      new TWEEN.Tween(cameraTarget) /* NEW */
        .to(earthPositionRef, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraTarget(cameraTarget);
        })
        .start();
      /*  camera.lookAt(earthPositionRef);
      camera.position.copy(cameraTargetPosition); */
    } else {
      const originalCameraPosition = new THREE.Vector3(17, 9, 19);
      const originalCameraTarget = new THREE.Vector3(0, 0, 0);
      //Tween to original position
      new TWEEN.Tween(cameraPosition) /* NEW */
        .to(originalCameraPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraPosition(cameraPosition);
        })
        .start();
      //Tween to original target
      new TWEEN.Tween(cameraTarget) /* NEW */
        .to(originalCameraTarget, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraTarget(cameraTarget);
        })
        .start();
    }
    camera.lookAt(cameraTarget); //(originalCameraTarget);
    camera.position.copy(cameraPosition); //(originalCameraPosition);
    camera.updateProjectionMatrix(); /* NEW */
  });

  return (
    <group ref={earthRef}>
      <mesh
        castShadow
        receiveShadow
        onClick={toggleFollowingEarth}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        {/*  radius, x-axis, y-axis */}
        <sphereGeometry args={[1, 37, 37]} />
        <meshPhongMaterial
          /* color="blue"  */
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={1000}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissiveIntensity={hovered ? 20 : 1.5}
          emissive={new THREE.Color(1, 1, 1)}
        />
      </mesh>
      <ISS />
      <Moon />
    </group>
  );
});

export default Earth;
