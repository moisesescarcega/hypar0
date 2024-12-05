import * as THREE from 'three'
import { useMemo } from 'react'

export function Ruled0 ({ seg, vertexX, vertexY, vertexZ, clipping, cp0, cp1 }) {
  const mantos = 2
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
  
  const puntoInicialUno = new THREE.Vector3(vCx, vCy, vCz)
  const puntoInicialDos = new THREE.Vector3(vDx, vDy, vDz)
  const puntosIniciales = [puntoInicialUno, puntoInicialDos]
  const lineaFinal = new THREE.BufferGeometry().setFromPoints(puntosIniciales)
  const lineaFinal2 = new THREE.BufferGeometry().setFromPoints(puntosIniciales).rotateY(THREE.MathUtils.degToRad(30))

  const planeClip0 = useMemo(() => {
    // Asignando valor de ángulo de inclinación de plano de corte vertical central
    const axis = new THREE.Vector3(0, 1, 0)
    const angle = THREE.MathUtils.degToRad(cp0)
    // return Array.from({ length: mantos }, (_, i) => {
    //   const mantoAngle = THREE.MathUtils.degToRad((180 / mantos) * i)
    //   return new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, mantoAngle - angle),0),
    //   new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, mantoAngle - angle),0),
    //   new THREE.Plane(new THREE.Vector3(1, 0, 0), cp1)
    // })

    // Genera un array de planos de corte
    for (let p = 1; p < mantos; p++) {
      return [
        new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, -THREE.MathUtils.degToRad((180 / mantos) * p)), 0),
        new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, THREE.MathUtils.degToRad((180 / mantos) * p)), 0),
        new THREE.Plane(new THREE.Vector3(1, 0, 0), cp1)
      ]
    }
    
    // return [
    //   new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, -angle), 0),
    //   new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, angle), 0),
    //   new THREE.Plane(new THREE.Vector3(1, 0, 0), cp1)
    // ]
  }, [cp0, cp1, clipping])

  const RuledSurface = () => {
    const lineas = []
    const planosCorte = []

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
      for (let m = 1; m <= mantos; m++) {
        const angulo = THREE.MathUtils.degToRad((180 / mantos) * m);
        const linea = new THREE.BufferGeometry().setFromPoints(puntos).rotateY(angulo);
        lineas.push({ geometry: linea, clip: m });
      }
      // for (let m = 1; m <= mantos; m++) {
      //   const ang = THREE.MathUtils.degToRad((180 / mantos) * m)
      //   lineas.push(new THREE.BufferGeometry().setFromPoints(puntos).rotateY(ang))
      // }
    }
    for (let p = 1; p <= mantos; p++){
      const axis = new THREE.Vector3(0, 1, 0)
      planosCorte.push(
        new THREE.Plane(new THREE.Vector3(0, 0, 1).applyAxisAngle(axis, -THREE.MathUtils.degToRad((180 / mantos) * p)), 0),
        new THREE.Plane(new THREE.Vector3(0, 0, -1).applyAxisAngle(axis, THREE.MathUtils.degToRad((180 / mantos) * p)), 0)
      )
    }
    console.log(lineas[4].clip)
    return (
      // Mostrar cada linea de cada segmento para generar la superficie reglada
      <>
        {lineas.map((linea, index) => (
          <line key={index} geometry={linea.geometry}>
            <lineBasicMaterial
              color={0x0000ff}
              linewidth={1}
              // clippingPlanes={clipping ? [linea.clip] : null}
              clippingPlanes={clipping ? planosCorte.slice(0 + (linea.clip), 2 + (linea.clip)) : null}
            />
          </line>
        ))}
      </>
      // lineas.map((linea, index) => (
      //   <line key={index} geometry={linea}>
      //     <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={clipping ? planeClip : null} />
      //   </line>
      // ))
    
    )
  }

  return (
    <>
      <RuledSurface />
    <line geometry={lineaFinal}>
      <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={clipping ? planeClip0 : null} />
    </line>
    </>
  )
}
