import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { ConfigHypar } from './ConfigHypar'
import { Ruled0 } from './Ruled0'

export const Canvasapp = () => {
  const [segments, setSegments] = useState(120)
  const [vertX, setVertX] = useState(5)
  const [vertY, setVertY] = useState(5)
  const [vertZ, setVertZ] = useState(7)
  const [clipping, setClipping] = useState(false)
  const [clipPlane0, setClipPlane0] = useState(45)
  const [clipPlane1, setClipPlane1] = useState(3)
  const sizeGrid = vertX
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
  const handleClipping = (e) => {
    setClipping(!clipping)
  }
  const handleCP0 = (e) => {
    setClipPlane0(e.target.value)
  }
  const handleCP1 = (e) => {
    setClipPlane1(e.target.value)
  }
  return (
    <div className='static'>
      {ConfigHypar(segments, handleSegments, vertX, handleX, vertY, handleY, vertZ, handleZ, clipping, handleClipping, clipPlane0, handleCP0, clipPlane1, handleCP1)}
      <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }} className='z-30' onCreated={(state) => (state.gl.localClippingEnabled = true)}>
        <Suspense fallback={<Html center>...cargando</Html>}>
          <ambientLight intensity={Math.PI / 8} />
          <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
          <OrbitControls makeDefault dampingFactor={0.3} />
          <Environment preset='sunset' />
          {/* <Plano /> */}
          {/* Rejilla de base TODO: agregar useState dentro de HandleX y HandleY para actualizar sizeGrid */}
          <gridHelper args={[(vertX > vertY ? vertX : vertY), (vertX > vertY ? vertX : vertY), 0xff0000, 'teal']} />
          {/* Componente de Hypar con los params X, Y y Z */}
          <Ruled0 seg={segments} vertexX={vertX} vertexY={vertY} vertexZ={vertZ} clipping={clipping} cp0={clipPlane0} cp1={clipPlane1} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Canvasapp
