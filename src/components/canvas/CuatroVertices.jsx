import { useRef } from 'react'
import * as THREE from 'three'

export function CuatroVertices () {
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
