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

// function SimpleLine() {
//     const vertices = []
//         vertices.push(new THREE.Vector3(5, 0, 0))
//         vertices.push(new THREE.Vector3(0, 0, 5))
//     const linea = new THREE.BufferGeometry().setFromPoints(vertices)
//     return (
//         <line geometry={linea}>
//             <lineBasicMaterial attach="material" color={0x0000ff} linewidth={2} />
//         </line>
//     )
// }

const segmentos = 28;
const vAx = -5, vAy = 7, vAz = 0;
const vBx = 0, vBy = -7, vBz = 5;
const vCx = 5, vCy = 7, vCz = 0;
const vDx = 0, vDy = -7, vDz = -5;

function Ruled0() {
    const lineas = [];

    // Crear líneas rectas para cada segmento
    for (let n = 1; n <= segmentos; n++) {
        const xA = ((vAx - vBx) / segmentos) * n; //-1.25  -2.50  -3.75  -5.00
        const yA = ((vBy / (segmentos / 2)) * ((segmentos - (segmentos / 2)) - n)); //-3.50  
        const zA = ((vAz - vBz) / segmentos) * (segmentos - n);

        const xC = ((vCx - vDx) / segmentos) * (segmentos - n); //5.00  3.75  2.50  1.25
        const yC = ((vCy / (segmentos / 2)) * ((segmentos - (segmentos / 2)) - n));
        const zC = ((vCz - vDz) / segmentos) * n;

        // Definir puntos para la línea actual
        const puntos = [];
        const puntoUno = new THREE.Vector3(xA, yA, zA);
        const puntoDos = new THREE.Vector3(xC, yC, zC);
        puntos.push(puntoUno)
        puntos.push(puntoDos)

        // Crear geometría de la línea
        const lineaDirectriz = new THREE.BufferGeometry().setFromPoints(puntos);

        // Agregar línea al array
        lineas.push(
            lineaDirectriz
        );
    }

    return (
        <>
            {
                lineas.map((linea, index) => (
                    <line key={index} geometry={linea}>
                        <lineBasicMaterial attach='material' color={0x0000ff} linewidth={1} />
                    </line>
                ))
            }
        </>
    );
}

export const Canvasapp = () => {
    return (
        <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }}>
        <ambientLight intensity={Math.PI / 8} />
        <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
        {/* <Hypar position={[0, 0, 0]} rotation={[THREE.MathUtils.degToRad(45), 0, 0]} /> */}
        <gridHelper args={[20, 20, 0xff0000, 'teal']} />
        <Ruled0 />
        <OrbitControls makeDefault dampingFactor={0.3} />
        <Environment preset="sunset" />
        </Canvas>
)
}

export default Canvasapp;