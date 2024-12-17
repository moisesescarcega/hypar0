import * as THREE from 'three'

export function planosDeCorte (mantos, cp0, cp1) {
  const axisY = new THREE.Vector3(0, 1, 0)
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
}
