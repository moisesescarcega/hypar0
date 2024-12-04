import * as THREE from 'three'
import { useMemo } from 'react'
// import { Plane } from '@react-three/drei'

export function Ruled0 ({ seg, vertexX, vertexY, vertexZ, clipping, cp0, cp1 }) {
  const lineas = []
  const vAx = -vertexX
  const vAy = vertexZ
  const vAz = 0
  const vBx = 0
  const vBy = -vertexZ
  const vBz = vertexY
  const vCx = vertexX
  const vCy = vertexZ
  const vCz = 0
  const vDx = 0
  const vDy = -vertexZ
  const vDz = -vertexY

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
    const puntos = [puntoUno, puntoDos]
    
    // Crear geometría de la línea
    const lineaDirectriz = new THREE.BufferGeometry().setFromPoints(puntos)
    
    // Agregar línea al array
    // // lineaDirectriz.rotateY(THREE.MathUtils.degToRad(45))
    lineas.push(lineaDirectriz)
  }
  
  const puntoInicialUno = new THREE.Vector3(vCx, vCy, vCz)
  const puntoInicialDos = new THREE.Vector3(vDx, vDy, vDz)
  const puntosIniciales = [puntoInicialUno, puntoInicialDos]
  const lineaFinal = new THREE.BufferGeometry().setFromPoints(puntosIniciales)
  const lineaFinal2 = new THREE.BufferGeometry().setFromPoints(puntosIniciales).rotateY(THREE.MathUtils.degToRad(30))

  const planeClip = useMemo(() => {
    // Asignando valor de ángulo de inclinación de plano de corte vertical central
    const axis = new THREE.Vector3(0, 1, 0)
    const angle = THREE.MathUtils.degToRad(cp0)
    // Genera un array de planos de corte
    return [
      new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, -angle), 0),
      new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, angle), 0),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), cp1)
    ]
  }, [cp0, cp1, clipping])
  // const PlaneSingle = () => {
  //   return (

  //     <Plane args={[8, 8]} rotation={[0, THREE.MathUtils.degToRad(-cp0), 0]}>
  //       <meshBasicMaterial side={THREE.DoubleSide} />
  //     </Plane>
  //   )
  // }

  return (
    <>
      {
        // Mostrar cada linea de cada segmento para generar la superficie reglada
        lineas.map((linea, index) => (
          <line key={index} geometry={linea}>
            <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={clipping ? planeClip : null} />
          </line>
        ))
      }
      <line geometry={lineaFinal}>
        <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={clipping ? planeClip : null} />
      </line>
      <line geometry={lineaFinal2}>
        <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={clipping ? planeClip : null} />
      </line>
    </>
  )
}
