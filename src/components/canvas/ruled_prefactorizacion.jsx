import * as THREE from 'three'
import { useMemo } from 'react'

export function Ruled0 ({ seg, vertexX, vertexY, vertexZ, clipping, cp0, cp1 }) {
  const mantos = 3
  const lineas = []
  const planosCorte = []
  const vAx = -vertexX, vAy = vertexZ, vAz = 0
  const vBx = 0, vBy = -vertexZ, vBz = vertexY
  const vCx = vertexX, vCy = vertexZ, vCz = 0
  const vDx = 0, vDy = -vertexZ, vDz = -vertexY
  
  const puntoInicialUno = new THREE.Vector3(vCx, vCy, vCz)
  const puntoInicialDos = new THREE.Vector3(vDx, vDy, vDz)
  const puntosIniciales = [puntoInicialUno, puntoInicialDos]

  const axis = new THREE.Vector3(0, 1, 0)
  const axis2 = new THREE.Vector3(-1, 0, 0)
  const angManto = 90 - (180 / mantos)
  planosCorte.push(
    {
      nplane: 1,
      cplane: [
        new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, THREE.MathUtils.degToRad(angManto - 30)), 0),
        new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, THREE.MathUtils.degToRad(-angManto - 30)), 0),
        new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axis2, THREE.MathUtils.degToRad(-5)).applyAxisAngle(axis, THREE.MathUtils.degToRad(-30)), cp1)
      ]
    }
  )
  
  const RuledSurface = () => {
    const angulo = THREE.MathUtils.degToRad((180 / mantos) * 1)
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
      
      // Arreglo de lineas con rotación para cada número de mantos
      const linea = new THREE.BufferGeometry().setFromPoints(puntos).rotateY(angulo)
      lineas.push({ geometry: linea, clip: 1 })
      
    }
    const lineaFinal = new THREE.BufferGeometry().setFromPoints(puntosIniciales).rotateY(angulo)
    lineas.push({ geometry: lineaFinal, clip: 1 })

    return (
      <>
        {lineas.map((linea, index) => (
          <line key={index} geometry={linea.geometry}>
            <lineBasicMaterial
              color={0x0000ff}
              linewidth={1}
              clippingPlanes={clipping ? planosCorte[0].cplane : null}
            />
          </line>
        ))}
      </>
    )
  }

  return (
    <>
      <RuledSurface />
    </>
  )
}
