import * as THREE from 'three';
import { useMemo, useEffect, useRef } from 'react';
import MaterialSettings from '../materialSettings'

export function Ruled0({ seg, vertexX, vertexY, vertexZ }) {
  const lineas = [];
  const vAx = -vertexX;
  const vAy = vertexZ;
  const vAz = 0;
  const vBx = 0;
  const vBy = -vertexZ;
  const vBz = vertexY;
  const vCx = vertexX;
  const vCy = vertexZ;
  const vCz = 0;
  const vDx = 0;
  const vDy = -vertexZ;
  const vDz = -vertexY;

  // Crear líneas rectas para cada segmento
  for (let n = 1; n <= seg; n++) {
    const xA = ((vAx - vBx) / seg) * n;
    const yA = (((2 * vBy) / seg) * ((seg - (seg / 2)) - n));
    const zA = ((vAz - vBz) / seg) * (seg - n);

    const xC = ((vCx - vDx) / seg) * (seg - n);
    const yC = ((vCy / (seg / 2)) * ((seg - (seg / 2)) - n));
    const zC = ((vCz - vDz) / seg) * n;

    // Definir puntos para la línea actual
    const puntoUno = new THREE.Vector3(xA, yA, zA);
    const puntoDos = new THREE.Vector3(xC, yC, zC);
    const puntoInicialUno = new THREE.Vector3(vCx, vCy, vCz);
    const puntoInicialDos = new THREE.Vector3(vDx, vDy, vDz);
    const puntos = [puntoUno, puntoDos];
    const puntosIniciales = [puntoInicialUno, puntoInicialDos];

    // Crear geometría de la línea
    const lineaDirectriz = new THREE.BufferGeometry().setFromPoints(puntos);
    const lineaFinal = new THREE.BufferGeometry().setFromPoints(puntosIniciales);

    // Agregar línea al array
    lineas.push(lineaDirectriz, lineaFinal);
  }

  // const PlaneStencilGroup = ({ geometry, plane, renderOrder }) => {
  //   return (
  //     <group dispose={null}>
  //       <mesh geometry={geometry} renderOrder={renderOrder}>
  //         <meshBasicMaterial attach="material" {...MaterialSettings.baseMatSettings} {...MaterialSettings.mat0} clippingPlanes={[plane]} />
  //       </mesh>
  //       <mesh geometry={geometry} renderOrder={renderOrder}>
  //         <meshBasicMaterial attach="material" {...MaterialSettings.baseMatSettings} {...MaterialSettings.mat1} clippingPlanes={[plane]} />
  //       </mesh>
  //     </group>
  //   )
  // }
  // const Clipper = ({ geo, planes, planesOffset }) => {
  //   const planeGeo = useMemo(() => {
  //     return new THREE.PlaneGeometry(4, 4)
  //   }, [])
  
  //   const planesGeoRef = useRef([])
  
  //   useEffect(() => {
  //     for (let i = 0; i < planesGeoRef.current.length; i++) {
  //       const plane = planes[i]
  //       const po = planesGeoRef.current[i]
  //       plane.constant = planesOffset[i]
  //       plane.coplanarPoint(po.position)
  //       po.lookAt(po.position.x - plane.normal.x, po.position.y - plane.normal.y, po.position.z - plane.normal.z)
  //     }
  //   }, [planes, planesOffset])
  //   return (
  //     <group>
  //     {planes.map((plane, index) => {
  //       return (
  //         <group key={index}>
  //           <PlaneStencilGroup geometry={geo} plane={plane} renderOrder={index + 1} />
  //           <mesh
  //             geometry={planeGeo}
  //             onAfterRender={(renderer) => renderer.clearStencil()}
  //             renderOrder={index + 1.1}
  //             ref={(el) => (planesGeoRef.current[index] = el)}>
  //             <meshStandardMaterial
  //               attach="material"
  //               color= {'yellow'}
  //   roughness= {0.75}
  //   stencilWrite= {true}
  //   stencilRef= {0}
  //   stencilFunc= {THREE.NotEqualStencilFunc}
  //   stencilFail= {THREE.ReplaceStencilOp}
  //   stencilZFail= {THREE.ReplaceStencilOp}
  //   stencilZPass= {THREE.ReplaceStencilOp}
  //               clippingPlanes={planes.filter((p) => p !== plane)}
  //             />
  //           </mesh>
  //         </group>
  //       )
  //     })}
  //     <mesh geometry={geo} castShadow={true}>
  //       <meshStandardMaterial clippingPlanes={planes} color={0xff0000} metalness={0.1} roughness={0.75}  clipShadows={true} shadowSide={THREE.DoubleSide} />
  //     </mesh>
  //     </group>
  //   )
  // }

  const planes = useMemo(() => {
    return [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
    ]
  }, [])

  const planeSingle = useMemo(() => {
    return [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)]
  }, [])

  // const geo = useMemo(() => {
  //   return new THREE.TorusKnotGeometry(0.4, 0.15, 220, 60)
  // }, [])
  return (
    <>
    {/* <Clipper geo={geo} planes={planes} planesOffset={[0.17, 0.38, 0.28]} /> */}
      {
        // Mostrar cada linea de cada segmento para generar la superficie reglada
        lineas.map((linea, index) => (
          <line key={index} geometry={linea}>
            <lineBasicMaterial color={0x0000ff} linewidth={1} clippingPlanes={planeSingle} />
          </line>
        ))}
    </>
  );
}
