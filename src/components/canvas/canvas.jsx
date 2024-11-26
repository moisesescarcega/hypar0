import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { ConfigHypar } from './ConfigHypar'
import { Ruled0 } from './Ruled0'

export const Canvasapp = () => {
    const [segments, setSegments] = useState(120)
    const [vertX, setVertX] = useState(5)
    const [vertY, setVertY] = useState(5)
    const [vertZ, setVertZ] = useState(7)
    const handleSegments = (e) => {
        setSegments(e.target.value)
    }
    const handleX = (e) => {
      setVertX(e.target.value)
    }
    const handleY = (e) => {
      setVertY(e.target.value)
    }
    const handleZ = (e) => {
      setVertZ(e.target.value)
    }
  return (
    <div className='static'>
      {ConfigHypar(segments, handleSegments, vertX, handleX, vertY, handleY, vertZ, handleZ)}
      <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }} className='z-30'>
        <ambientLight intensity={Math.PI / 8} />
        <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
        <OrbitControls makeDefault dampingFactor={0.3} />
        <Environment preset='sunset' />
        {/* Rejilla de base */}
        <gridHelper args={[20, 20, 0xff0000, 'teal']} />
        {/* Componente de Hypar con los params X, Y y Z */}
        <Ruled0 seg={segments} vertexX={vertX} vertexY={vertY} vertexZ={vertZ} />
      </Canvas>
    </div>
  )
}

export default Canvasapp
