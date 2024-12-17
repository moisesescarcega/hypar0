import { Segments, Segment } from '@react-three/drei'
import { useMemo, useRef, useEffect } from 'react'
import { planosDeCorte } from './planosDeCorte'
import * as THREE from 'three'

export function Ruled1 ({ seg, vertexX, vertexY, vertexZ, mantos, clipping, cp0, cp1 }) {
  const segmentsRef = useRef()
  const lineasRef = useRef([])

  // Limpieza de geometrías y materiales
  useEffect(() => {
    return () => {
      if (segmentsRef.current) {
        segmentsRef.current.traverse((child) => {
          if (child.geometry) {
            child.geometry.dispose()
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [seg])

  // Coordenadas base
  const vertices = useMemo(() => [
    { x: -vertexX, y: vertexZ, z: 0 },
    { x: 0, y: -vertexZ, z: vertexY },
    { x: vertexX, y: vertexZ, z: 0 },
    { x: 0, y: -vertexZ, z: -vertexY }
  ], [vertexX, vertexY, vertexZ])
  
  // Generar planos de corte usando useMemo
  const planosCorte = useMemo(() => {
    return planosDeCorte(mantos, cp0, cp1)
  }, [mantos, cp0, cp1])

  // Memoización de líneas generadas
  const generatedLineas = useMemo(() => {
    const lines = []
    for (let n = 1; n <= seg; n++) {
      const xA = ((vertices[0].x - vertices[1].x) / seg) * n
      const yA = ((2 * vertices[1].y) / seg) * ((seg - seg / 2) - n)
      const zA = ((vertices[0].z - vertices[1].z) / seg) * (seg - n)

      const xC = ((vertices[2].x - vertices[3].x) / seg) * (seg - n)
      const yC = (vertices[2].y / (seg / 2)) * ((seg - seg / 2) - n)
      const zC = ((vertices[2].z - vertices[3].z) / seg) * n

      lines.push({
        pUno: new THREE.Vector3(xA, yA, zA),
        pDos: new THREE.Vector3(xC, yC, zC)
      })
    }
    lines.push({
      pUno: new THREE.Vector3(vertices[2].x, vertices[2].y, vertices[2].z),
      pDos: new THREE.Vector3(vertices[3].x, vertices[3].y, vertices[3].z)
    })
    return lines
  }, [seg, vertexX, vertexY, vertexZ])

  lineasRef.current = generatedLineas

  const RuledSurface = () => {
    const anguloPorManto = 360 / mantos
    if (clipping) {
      return (
        <>
          {Array.from({ length: mantos }).map((_, i) => (
            <group
              key={i}
              rotation-y={THREE.MathUtils.degToRad(anguloPorManto * i)}
              ref={(el) => {
                if (el) segmentsRef.current = el
              }}
            >
              <Segments
                limit={400}
                lineWidth={1}
                color='#193d6b'
                clippingPlanes={planosCorte[i].cplane}
              >
                {lineasRef.current.map((linea, index) => (
                  <Segment
                    key={index}
                    start={[linea.pUno.x, linea.pUno.y, linea.pUno.z]}
                    end={[linea.pDos.x, linea.pDos.y, linea.pDos.z]}
                  />
                ))}
              </Segments>
            </group>
          ))}
        </>
      )
    } else {
      return (
        <group ref={(el) => {
          if (el) segmentsRef.current = el
        }}
        >
          <Segments limit={400} lineWidth={1} color='#0000ff'>
            {lineasRef.current.slice(0, seg).map((linea, index) => (
              <Segment
                key={index}
                start={[linea.pUno.x, linea.pUno.y, linea.pUno.z]}
                end={[linea.pDos.x, linea.pDos.y, linea.pDos.z]}
              />
            ))}
          </Segments>
        </group>
      )
    }
  }

  return <RuledSurface />
}
