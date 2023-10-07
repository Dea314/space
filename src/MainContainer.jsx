import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars";
import Earth from "./scenes/earth/Earth";
import { useRef } from "react";
import * as THREE from "three";
import Sun from "./scenes/sun/Sun";
//import { Perf } from "r3f-perf";
import CameraPositionLogging from "./helpers/CameraPositionLogging";

const MainContainer = () => {
  const directionalLightRef = useRef();
  const directionalLightRefTwo = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, "red");

  return (
    <>
      {/* <Perf /> */}
      <CameraPositionLogging event="mousedown" />
      <AnimatedStars />
      <directionalLight
        castShadow
        /*   ref={directionalLightRef} */
        position={[0, 0, 10]}
        intensity={3}
      />
      {/*
      <directionalLight
        castShadow
        ref={directionalLightRefTwo}
        color="white"
        position={[0, 0, -10]}
      /> */}
      <ambientLight intensity={2} />
      <Sun />
      <Earth displacementScale={0.15} />
    </>
  );
};

export default MainContainer;
