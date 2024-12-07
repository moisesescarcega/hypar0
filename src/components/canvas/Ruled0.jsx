import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function Ruled0 ({ seg, vertexX, vertexY, vertexZ, mantos, clipping, cp0, cp1 }) {
  const meshRef = useRef()
  const axisY = new THREE.Vector3(0, 1, 0)

  // Coordenadas base
  const vertices = useMemo(() => [
    { x: -vertexX, y: vertexZ, z: 0 },
    { x: 0, y: -vertexZ, z: vertexY },
    { x: vertexX, y: vertexZ, z: 0 },
    { x: 0, y: -vertexZ, z: -vertexY }
  ], [vertexX, vertexY, vertexZ]);

  const puntosIniciales = useMemo(() => [
    new THREE.Vector3(vertices[2].x, vertices[2].y, vertices[2].z),
    new THREE.Vector3(vertices[3].x, vertices[3].y, vertices[3].z)
  ], [vertices]);

  // Generar planos de corte usando useMemo
  const planosCorte = useMemo(() => {
    const anguloPorManto = 360 / mantos
    const medioAnguloPorManto = 180 / mantos
    const generatedPlanes = []

    for (let i = 0; i < mantos; i++) {
      const rotacion = THREE.MathUtils.degToRad((anguloPorManto * i) + medioAnguloPorManto)
      const rotacionPlanoCorte = THREE.MathUtils.degToRad((anguloPorManto * i) + 90)

      generatedPlanes.push({
        nplane: i + 1,
        cplane: [
          new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axisY, rotacion), 0),
          new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axisY, rotacion + THREE.MathUtils.degToRad(-anguloPorManto)), 0),
          new THREE.Plane(
            new THREE.Vector3(0, 0, -1)
              .applyAxisAngle(new THREE.Vector3(-1, 0, 0), THREE.MathUtils.degToRad(-cp0))
              .applyAxisAngle(axisY, rotacionPlanoCorte),
            cp1
          )
        ]
      })
    }

    return generatedPlanes
  }, [mantos, cp0, cp1])

  const RuledSurface = () => {
    const lineas = []

    const anguloPorManto = 360 / mantos

    for (let i = 0; i < mantos; i++) {
      const rotacion = THREE.MathUtils.degToRad(anguloPorManto * i)

      for (let n = 1; n <= seg; n++) {
        const xA = ((vertices[0].x - vertices[1].x) / seg) * n
        const yA = ((2 * vertices[1].y) / seg) * ((seg - seg / 2) - n)
        const zA = ((vertices[0].z - vertices[1].z) / seg) * (seg - n)

        const xC = ((vertices[2].x - vertices[3].x) / seg) * (seg - n)
        const yC = (vertices[2].y / (seg / 2)) * ((seg - seg / 2) - n)
        const zC = ((vertices[2].z - vertices[3].z) / seg) * n

        const puntoUno = new THREE.Vector3(xA, yA, zA)
        const puntoDos = new THREE.Vector3(xC, yC, zC)

        const linea = new THREE.BufferGeometry()
          .setFromPoints([puntoUno, puntoDos])
          .rotateY(rotacion)

        lineas.push({ geometry: linea, clip: planosCorte[i].cplane })
      }

      const lineaFinal = new THREE.BufferGeometry()
        .setFromPoints(puntosIniciales)
        .rotateY(rotacion)

      lineas.push({ geometry: lineaFinal, clip: planosCorte[i].cplane })
    }

    return (
      <>
        {
        mostrarHypar()
        }
      </>
    )

    function mostrarHypar () {
      if (clipping) {
        return lineas.map((linea, index) => (
          <line key={index} geometry={linea.geometry}>
            <lineBasicMaterial
              color={0x0000ff}
              linewidth={1}
              clippingPlanes={clipping ? linea.clip : null}
            />
          </line>
        ))
      } else {
        return lineas.slice(0, seg).map((linea, index) => (
          <line key={index} geometry={linea.geometry}>
            <lineBasicMaterial
              color={0x0000ff}
              linewidth={1}
              clippingPlanes={clipping ? linea.clip : null}
            />
          </line>
        ))
      }
    }
  }

  return (
    <>
      <RuledSurface />
    </>
  )
}
