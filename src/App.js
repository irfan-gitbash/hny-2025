import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import CardFlip from "./CardFlip";

function App() {
  const particlesInit = async (preset) => {
    await loadFireworksPreset(preset);
  };
  return (
    <>
      <Particles init={particlesInit} options={{ preset: "fireworks" }} />;
      <CardFlip />
    </>
  );
}

export default App;
