import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

const Cube = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box args={[1, 1, 1]}> {/* args specifies dimensions of the Box */}
        <meshBasicMaterial attach="material" color="green" />
      </Box>
      <OrbitControls />
    </Canvas>
  );
};

export default Cube;
