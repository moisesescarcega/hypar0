import { useMemo, useRef, useState } from 'react';
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

const segmentos = 8;
const vAx = -5, vAy = 7, vAz = 0;
const vBx = 0, vBy = -7, vBz = 5;
const vCx = 5, vCy = 7, vCz = 0;
const vDx = 0, vDy = -7, vDz = -5;

function CuatroVertices() {
    const rVertices = useRef()
    return (
        <>
            <points ref={rVertices} rotation-y={THREE.MathUtils.degToRad(45)} >
                <boxGeometry args={[7.071, 14, 7.071]} />
                {/* <bufferGeometry /> */}
                <pointsMaterial attach='material' color={0x000066} size={1} />
            </points>
        </>
    )
}

function Ruled0() {
    const lineas = [];

    // Crear líneas rectas para cada segmento
    for (let n = 1; n <= segmentos; n++) {
        const xA = ((vAx - vBx) / segmentos) * n; 
        const yA = (((2 * vBy) / segmentos) * ((segmentos - (segmentos / 2)) - n));   
        const zA = ((vAz - vBz) / segmentos) * (segmentos - n);

        const xC = ((vCx - vDx) / segmentos) * (segmentos - n); 
        const yC = ((vCy / (segmentos / 2)) * ((segmentos - (segmentos / 2)) - n));
        const zC = ((vCz - vDz) / segmentos) * n;

        // Definir puntos para la línea actual
        const puntoUno = new THREE.Vector3(xA, yA, zA);
        const puntoDos = new THREE.Vector3(xC, yC, zC);
        const puntoInicialUno = new THREE.Vector3(vCx, vCy, vCz);
        const puntoInicialDos = new THREE.Vector3(vDx, vDy, vDz);
        const puntos = [puntoUno, puntoDos];
        const puntosIniciales = [puntoInicialUno, puntoInicialDos];
        // puntos.push(puntoUno, puntoDos)

        // Crear geometría de la línea
        const lineaDirectriz = new THREE.BufferGeometry().setFromPoints(puntos);
        const lineaFinal = new THREE.BufferGeometry().setFromPoints(puntosIniciales);

        // Agregar línea al array
        lineas.push(lineaDirectriz, lineaFinal);
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
        {/* <Hypar position={[0, 0, 0]} rotation={[THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90)]} /> */}
        <gridHelper args={[20, 20, 0xff0000, 'teal']} />
        <Ruled0 />
        {/* <CuatroVertices /> */}
        <OrbitControls makeDefault dampingFactor={0.3} />
        <Environment preset="sunset" />
        </Canvas>
)
}

export default Canvasapp;