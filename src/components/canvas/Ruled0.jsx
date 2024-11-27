import * as THREE from 'three'
import { useMemo } from 'react'

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

  const planeClip = useMemo(() => {
    return [
      new THREE.Plane(new THREE.Vector3(THREE.MathUtils.degToRad(-cp0), 0, 1), 0),
      new THREE.Plane(new THREE.Vector3(THREE.MathUtils.degToRad(-cp0), 0, -1), 0),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), cp1)
    ]
  }, [cp0, cp1, clipping])

  return (
    <>
      {
        // Mostrar cada linea de cada segmento para generar la superficie reglada
        lineas.map((linea, index) => (
          <line key={index} geometry={linea}>
            <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={planeClip} />
          </line>
        ))
}
    </>
  )
}
