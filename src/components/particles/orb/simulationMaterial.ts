import simulationVertexShader from './shaders/simulationVertex';
import simulationFragmentShader from './shaders/simulationFragment';
import * as THREE from 'three';
import type { DataTexture, IUniform} from 'three';

export interface UniformType {
    [uniform: string]: IUniform<any>;
};

function getRandomData(width: number, height: number): Float32Array {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length: number = width * height * 4;
  const data: Float32Array = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const stride: number = i * 4;

    const distance: number = Math.sqrt(Math.random()) * 2.0;
    const theta: number = THREE.MathUtils.randFloatSpread(360);
    const phi: number = THREE.MathUtils.randFloatSpread(360);

    data[stride] =  distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] =  distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] =  distance * Math.cos(theta);
    data[stride + 3] =  1.0; // this value will not have any impact
  }

  return data;
}

export default class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(size: number) {
    const positionsTexture: DataTexture = new THREE.DataTexture(
      getRandomData(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms: UniformType = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}
