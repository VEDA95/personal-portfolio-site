import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls, useFBO } from '@react-three/drei';
import { Canvas, useFrame, extend, createPortal } from '@react-three/fiber';
import SimulationMaterial from './simulationMaterial';
import vertexShader from './shaders/vertex';
import fragmentShader from './shaders/fragment';
import type { ReactElement, FC, MutableRefObject } from 'react';
import type { Scene, OrthographicCamera, WebGLRenderTarget, Texture } from 'three';
import type { UniformType } from './simulationMaterial';

extend({ SimulationMaterial: SimulationMaterial });

interface ParticleProps {
	invisible?: boolean;
}

function FBOParticles(): ReactElement<FC> {
	const size: number = 256;
	const points: MutableRefObject<any> = useRef();
	const simulationMaterialRef: MutableRefObject<any> = useRef();
	const scene: Scene = new THREE.Scene();
	const camera: OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
	const positions: Float32Array = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
	const uvs: Float32Array = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);
	const renderTarget: WebGLRenderTarget<Texture> = useFBO(size, size, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat,
		stencilBuffer: false,
		type: THREE.FloatType
	});
	const particlesPosition: Float32Array = useMemo(() => {
		const length: number = size * size;
		const particles: Float32Array = new Float32Array(length * 3);

		for (let i = 0; i < length; i++) {
			let i3: number = i * 3;
			particles[i3 + 0] = (i % size) / size;
			particles[i3 + 1] = i / size / size;
		}

		return particles;
	}, [size]);
	const uniforms: UniformType = useMemo(() => ({
		uPositions: {
			value: null
		}
	}),[]);

	useFrame((state) => {
		const { gl, clock } = state;

		gl.setRenderTarget(renderTarget);
		gl.clear();
		gl.render(scene, camera);
		gl.setRenderTarget(null);

		points.current.material.uniforms.uPositions.value = renderTarget.texture;
		simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
	});

	return (
		<>
			{createPortal(
				<mesh>
					<simulationMaterial ref={simulationMaterialRef} args={[size]} />
					<bufferGeometry>
						<bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
						<bufferAttribute attach="attributes-uv" count={uvs.length / 2} array={uvs} itemSize={2} />
					</bufferGeometry>
				</mesh>,
				scene
			)}
			<points ref={points}>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" count={particlesPosition.length / 3} array={particlesPosition} itemSize={3} />
				</bufferGeometry>
				<shaderMaterial
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={uniforms}
				/>
			</points>
		</>
	);
}

export default function ParticleOrb({ invisible = false }: ParticleProps): ReactElement<FC> {
	return (
		<Canvas camera={{ position: [1.5, 1.5, 2.5] }} style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: -20, visibility: !invisible ? 'visible' : 'hidden'}}>
			<ambientLight intensity={0.5} />
			<FBOParticles />
			<OrbitControls />
		</Canvas>
	);
}
