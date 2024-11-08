import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Shape } from "@react-three/drei";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import * as THREE from 'three';

function Hypar(props) {
    const [hovered, hover] = useState(false)
    const a = 1
    const b = 1
    const parabHiper = new ParametricGeometry(
        (u, v, target) => {
        const x = (u - 0.5) * 5 // Escala u para que vaya de -5 a 5
        const y = (v - 0.5) * 5 // Escala v para que vaya de -5 a 5
        const z = (x * x) / (a * a) - (y * y) / (b * b) // Ecuación del paraboloide hiperbólico
        target.set(x, y, z)
        },
        50,
        50
    )
    return (
        <mesh castShadow receiveShadow geometry={parabHiper} {...props}>
        <meshStandardMaterial color={0x0000ff} side={THREE.DoubleSide} />
        </mesh>
    )
}

function HyparRuled(props) {
    const dimension = 10
    const shape = useMemo(() => {
        const shape = new THREE.Shape()
        const halfDimension = dimension / 2
        for (let x = -halfDimension; x <= halfDimension; x += 0.5) {
            for (let y = -halfDimension; y <= halfDimension; y += 0.5) {
                const z = (x * x - y * y) / (dimension * dimension)
                shape.lineTo(x, y, z)
            }
        }
    })
    return (
        <mesh castShadow receiveShadow geometry={shape} {...props} >
            <meshStandardMaterial color={0x0000ff} wireframe />
        </mesh>
    )
}

function SimpleLine() {
    const vertices = []
        vertices.push(new THREE.Vector3(5, 0, 0))
        vertices.push(new THREE.Vector3(0, 0, 5))
    const linea = new THREE.BufferGeometry().setFromPoints(vertices)
    return (
        <line geometry={linea}>
            <lineBasicMaterial attach="material" color={0x0000ff} linewidth={2} />
        </line>
    )
}

export const Canvasapp = () => {
    return (
        <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }}>
        <ambientLight intensity={Math.PI / 8} />
        <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
        <Hypar position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
        {/* <SimpleLine /> */}
        <OrbitControls makeDefault dampingFactor={0.3} />
        <Environment preset="sunset" />
        </Canvas>
)
}

export default Canvasapp;