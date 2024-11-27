import { Suspense, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Html, Plane } from '@react-three/drei'
import { ConfigHypar } from './ConfigHypar'
import { Ruled0 } from './Ruled0'
import * as THREE from 'three'

const Plano = () => {
  return (
    <Plane args={[4, 4]}>
      <meshStandardMaterial attach="material" color={0x660000} side={THREE.DoubleSide} />
    </Plane>
  )
}
const ClippingPlane = () => {
  const {gl} = useThree()
  useEffect(() => {
    const {clippingPlanes, localClippingEnabled} = gl
    const plane = new THREE.Plane(new THREE.Vector3(1,0,0),0.9)
    gl.clippingPlanes = [plane]
    gl.localClippingEnabled = true
    return () => Object.assign(gl, {clippingPlanes, localClippingEnabled})
  }, [])
  return null
}

export const Canvasapp = () => {
    const [segments, setSegments] = useState(120)
    const [vertX, setVertX] = useState(5)
    const [vertY, setVertY] = useState(5)
    const [vertZ, setVertZ] = useState(7)
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
  return (
    <div className='static'>
      {ConfigHypar(segments, handleSegments, vertX, handleX, vertY, handleY, vertZ, handleZ)}
      <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }} className='z-30'>
        <Suspense fallback={<Html center>...cargando</Html>}>
          <ambientLight intensity={Math.PI / 8} />
          <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
          <OrbitControls makeDefault dampingFactor={0.3} />
          <Environment preset='sunset' />
          {/* <Plano /> */}
          {/* Rejilla de base TODO: agregar useState dentro de HandleX y HandleY para actualizar sizeGrid */}
          <gridHelper args={[(vertX > vertY ? vertX : vertY), (vertX > vertY ? vertX : vertY), 0xff0000, 'teal']} />
          {/* Componente de Hypar con los params X, Y y Z */}
          <ClippingPlane />
          <Ruled0 seg={segments} vertexX={vertX} vertexY={vertY} vertexZ={vertZ} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Canvasapp
