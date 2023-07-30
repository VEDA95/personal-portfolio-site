import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import fragmentShader from './shaders/fragment';
import vertexShader from './shaders/vertex';
import type { ReactElement, FC, MutableRefObject } from 'react';
import type { ParticleProps } from '../types';

function ParticleWaveAnimation(): ReactElement<FC> {
	const particles: MutableRefObject<any> = useRef(null);
	const count: MutableRefObject<number> = useRef(0);
	const AMOUNTX: number = 90;
	const AMOUNTY: number = 90;
	const SEPERATION: number = 50;
	const numOfParticles: number = AMOUNTX * AMOUNTY;
	const [initPositions, initScales]: Array<Float32Array> = useMemo((): Array<Float32Array> => {
		const positions: Float32Array = new Float32Array(numOfParticles * 3);
		const scales: Float32Array = new Float32Array(numOfParticles);
		let index1: number = 0;
		let index2: number = 0;

		for (let index3: number = 0; index3 < AMOUNTX; index3++) {
			for (let index4: number = 0; index4 < AMOUNTY; index4++) {
				positions[index1] = index3 * SEPERATION - (AMOUNTX * SEPERATION) / 2;
				positions[index1 + 1] = 0;
				positions[index1 + 2] = index4 * SEPERATION - (AMOUNTY * SEPERATION) / 2;
				scales[index2] = 1;

				index1 += 3;
				index2++;
			}
		}

		return [positions, scales];
	}, [numOfParticles]);
	const uniforms: any = useMemo(
		() => ({
			color: { value: new THREE.Color(0xffffff) }
		}),
		[]
	);

	useFrame(({ gl }) => {
		if (count.current === 0) {
			gl.setPixelRatio(window.devicePixelRatio);
			gl.useLegacyLights = false;
		}

		const particlePositions: Float32Array = particles.current.geometry.attributes.position.array;
		const particleScales: Float32Array = particles.current.geometry.attributes.scale.array;
		let index1: number = 0;
		let index2: number = 0;

		for (let index3: number = 0; index3 < AMOUNTX; index3++) {
			for (let index4: number = 0; index4 < AMOUNTY; index4++) {
				particlePositions[index1 + 1] = Math.sin((index3 + count.current) * 0.3) * 50 + Math.sin((index4 + count.current) * 0.5) * 50;
				particleScales[index2] = (Math.sin((index3 + count.current) * 0.3) + 1) * 20 + (Math.sin((index4 + count.current) * 0.5) + 1) * 20;

				index1 += 3;
				index2++;
			}
		}

		particles.current.geometry.attributes.position.needsUpdate = true;
		particles.current.geometry.attributes.scale.needsUpdate = true;
		count.current += 0.1;
	});

	return (
		<points ref={particles}>
			<bufferGeometry attach="geometry">
				<bufferAttribute attach="attributes-position" count={initPositions.length / 3} array={initPositions} itemSize={3} />
				<bufferAttribute attach="attributes-scale" count={initScales.length} array={initScales} itemSize={1} />
			</bufferGeometry>
			<shaderMaterial
                attach="material"
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}/>
		</points>
	);
}

export default function ParticleWave({invisible = false}: ParticleProps): ReactElement<FC> {
	return (
		<Canvas camera={{ position: [-100, 100, 1000] }} style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: -20, visibility: !invisible ? 'visible' : 'hidden'}}>
			<ambientLight intensity={0.5} />
			<ParticleWaveAnimation />
			<OrbitControls />
		</Canvas>
	);
}
