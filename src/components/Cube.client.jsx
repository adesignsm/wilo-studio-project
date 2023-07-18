import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { Box } from 'drei';

const Cube = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box>
        <meshBasicMaterial attach="material" color="green" />
      </Box>
    </Canvas>
  );
};

export default Cube;

