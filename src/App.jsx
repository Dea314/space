import { Canvas } from "@react-three/fiber";
import MainContainer from "./MainContainer";
import { OrbitControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";

function App() {
  return (
    <Canvas
      shadows
      camera={{ fov: 55, near: 0.1, far: 1000, position: [17, 9, 19] }}
    >
      <color attach="background" args={["black"]} />
      {/*  <Perf /> performance tracker */}
      {/*  <OrbitControls /> */}
      <MainContainer />
    </Canvas>
  );
}

export default App;
