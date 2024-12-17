import { useMemo } from 'react'
import { NURBSSurface } from 'three/examples/jsm/curves/NURBSSurface'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'
import { planosDeCorte } from './planosDeCorte'
import * as THREE from 'three'

export function NurbsSurface({vertX, vertY, vertZ, mantos, cp0, cp1}) {
    const planosCorte = useMemo(() => {
        return planosDeCorte(mantos, cp0, cp1)
      }, [mantos, cp0, cp1])

    const nsControlPoints = [
        [
        new THREE.Vector3(vertX, vertZ, 0), // Vértice 1
        new THREE.Vector3(0, -vertZ, vertY), // Vértice 2 
        ],
        [
        new THREE.Vector3(0, -vertZ, -vertY), // Vértice 3 
        new THREE.Vector3(-vertX, vertZ, 0), // Vértice 2 
        ]
    ]
    const degree1 = 1
    const degree2 = 1
    const knots1 = [0, 0, 1, 1]
    const knots2 = [0, 0, 1, 1]
    const nurbsSurface = new NURBSSurface(degree1, degree2, knots1, knots2, nsControlPoints)
    function getSurfacePoints(u, v, target) {
        return nurbsSurface.getPoint(u, v, target)
    }
    const geometry = new ParametricGeometry(getSurfacePoints, 100, 100)
    const anguloPorManto = 360 / mantos
    
    return (
        <>
            {Array.from({ length: mantos }).map((_, i) => (
                
                    <mesh 
                    key={i}
                    rotation-y={THREE.MathUtils.degToRad(anguloPorManto * i)}
                        geometry={geometry} 
                        material={new THREE.MeshStandardMaterial({
                            color: '#193d6b', 
                            side: THREE.DoubleSide, 
                            roughness: 0.5, 
                            metalness: 0.1, 
                            envMapIntensity: 0.5, 
                            clippingPlanes: planosCorte[i].cplane
                        })}
                    />
                
            ))}
        </>
    )
}