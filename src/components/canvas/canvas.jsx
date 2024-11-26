import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'

const segmentos = 128
const vAx = -5; const vAy = 7; const vAz = 0
const vBx = 0; const vBy = -7; const vBz = 5
const vCx = 5; const vCy = 7; const vCz = 0
const vDx = 0; const vDy = -7; const vDz = -5

function CuatroVertices () {
  const rVertices = useRef()
  return (
    <>
      <points ref={rVertices} rotation-y={THREE.MathUtils.degToRad(45)}>
        <boxGeometry args={[7.071, 14, 7.071]} />
        <pointsMaterial attach='material' color={0x000066} size={0.2} />
      </points>
    </>
  )
}

function Ruled0 ({seg}) {
  const lineas = []

  // Crear líneas rectas para cada segmento
  for (let n = 1; n <= seg; n++) {
    const xA = ((vAx - vBx) / seg) * n
    const yA = (((2 * vBy) / seg) * ((seg - (seg / 2)) - n))
    const zA = ((vAz - vBz) / seg) * (seg - n)

    const xC = ((vCx - vDx) / seg) * (seg - n)
    const yC = ((vCy / (seg / 2)) * ((seg - (seg / 2)) - n))
    const zC = ((vCz - vDz) / seg) * n

    // Definir puntos para la línea actual
    const puntoUno = new THREE.Vector3(xA, yA, zA)
    const puntoDos = new THREE.Vector3(xC, yC, zC)
    const puntoInicialUno = new THREE.Vector3(vCx, vCy, vCz)
    const puntoInicialDos = new THREE.Vector3(vDx, vDy, vDz)
    const puntos = [puntoUno, puntoDos]
    const puntosIniciales = [puntoInicialUno, puntoInicialDos]

    // Crear geometría de la línea
    const lineaDirectriz = new THREE.BufferGeometry().setFromPoints(puntos)
    const lineaFinal = new THREE.BufferGeometry().setFromPoints(puntosIniciales)

    // Agregar línea al array
    lineas.push(lineaDirectriz, lineaFinal)
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
  )
}

export const Canvasapp = () => {
    const [segments, setSegments] = useState(120)
    const handleChange = (e) => {
        setSegments(e.target.value)
    }
  return (
    <>
      <div className="mx-3">
        <label>Segmentos:&nbsp;</label>
        <input id="default-range" type="range" value={segments} onChange={handleChange} min="3" max="200" className="h-2 mx-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
        <label>{segments}</label>
      </div>
      <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }}>
        <ambientLight intensity={Math.PI / 8} />
        <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
        <OrbitControls makeDefault dampingFactor={0.3} />
        <Environment preset='sunset' />
        <gridHelper args={[20, 20, 0xff0000, 'teal']} />
        <Ruled0 seg={segments} />
        <CuatroVertices />
        <Html center>
          <label>Segmentos: </label>
        </Html>
      </Canvas>
    </>
  )
}

export default Canvasapp
