import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html, Segments, Segment } from '@react-three/drei'
import { ConfigHypar } from './ConfigHypar'
import { Ruled1 } from './Ruled1'
import * as THREE from 'three'
export const Canvasapp = () => {
  const [segments, setSegments] = useState(80)
  const [vertX, setVertX] = useState(20)
  const [vertY, setVertY] = useState(10)
  const [vertZ, setVertZ] = useState(28)
  const [nMantos, setNMantos] = useState(4)
  const [clipping, setClipping] = useState(true)
  const [clipPlane0, setClipPlane0] = useState(8)
  const [clipPlane1, setClipPlane1] = useState(5)
  const [rotationEnabled, setRotationEnabled] = useState(true) // Control del giro automático
  const [lastInteraction, setLastInteraction] = useState(Date.now()) // Tiempo de última interacción
  const [configurable, setConfigurable] = useState(false)

  // Definir las diferentes configuraciones
  const configurations = [
    { hypar: 'Pabellón Oslo', nMantos: 3, vertX: 22, vertY: 14, vertZ: 26, clipPlane0: 16, clipPlane1: 5 },
    { hypar: 'Casino de la Selva', nMantos: 5, vertX: 30, vertY: 10, vertZ: 27, clipPlane0: 25, clipPlane1: 7.5 },
    { hypar: 'San Antonio de las Huertas', nMantos: 4, vertX: 30, vertY: 14, vertZ: 43, clipPlane0: 0, clipPlane1: 9 },
    { hypar: 'Manantiales', nMantos: 8, vertX: 37, vertY: 9, vertZ: 26, clipPlane0: 19, clipPlane1: 12 }
  ]

  const [configIndex, setConfigIndex] = useState(0)

  // const LineaPrueba = () => {
  //   const axisY = new THREE.Vector3(1, 10, 1)
  //   return (
  //     <group rotation={[Math.PI / 4, 0, 0]}>
  //       <Segments limit={5000} lineWidth={2} color={'#ff0000'}>
  //         {[...Array(5000)].map((_, i) => (
  //           <Segment 
  //             key={i}
  //             start={[0 + (0.1 * i), 0, 0 + (0.1 * i)]} 
  //             end={[50 + (0.1 * i), 50, 50 + (0.1 * i)]}
  //           />
  //         ))}
  //       </Segments>
  //     </group>
  //   )
  // }
  // Función para actualizar los estados gradualmente
  const animateToNewValues = useCallback((targetConfig) => {
    const steps = 30 // Número de pasos para la animación
    const duration = 700 // Duración de la animación en ms
    const stepDuration = duration / steps

    let currentStep = 0

    const initialValues = {
      nMantos: nMantos,
      vertX: vertX,
      vertY: vertY,
      vertZ: vertZ,
      clipPlane0: clipPlane0,
      clipPlane1: clipPlane1
    }

    const animate = () => {
      currentStep++
      const progress = currentStep / steps

      // Interpolación lineal para cada valor
      setNMantos(Math.round(initialValues.nMantos + (targetConfig.nMantos - initialValues.nMantos) * progress))
      setVertX(Math.round(initialValues.vertX + (targetConfig.vertX - initialValues.vertX) * progress))
      setVertY(Math.round(initialValues.vertY + (targetConfig.vertY - initialValues.vertY) * progress))
      setVertZ(Math.round(initialValues.vertZ + (targetConfig.vertZ - initialValues.vertZ) * progress))
      setClipPlane0(initialValues.clipPlane0 + (targetConfig.clipPlane0 - initialValues.clipPlane0) * progress)
      setClipPlane1(initialValues.clipPlane1 + (targetConfig.clipPlane1 - initialValues.clipPlane1) * progress)

      if (currentStep < steps) {
        setTimeout(animate, stepDuration)
      }
    }

    animate()
  }, [nMantos, vertX, vertY, vertZ, clipPlane0, clipPlane1])

  // Efecto para cambiar la configuración cada 5 segundos
  useEffect(() => {
    let interval
    if (!configurable) {
      interval = setInterval(() => {
        const nextIndex = (configIndex + 1) % configurations.length
        setConfigIndex(nextIndex)
        animateToNewValues(configurations[nextIndex])
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [configIndex, animateToNewValues, configurable])

  const handleInteraction = () => {
    setRotationEnabled(false)
    setLastInteraction(Date.now())
  }

  // Reanudar rotación después de 2 segundos de inactividad
  useEffect(() => {
    const interval = setInterval(() => {
      if (!rotationEnabled && Date.now() - lastInteraction > 3500) {
        setRotationEnabled(true)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [rotationEnabled, lastInteraction])

  const sizeGrid = vertX
  const handleSegments = (e) => {
    setSegments(e.target.value)
  }
  const handleX = (e) => {
    setVertX(e.target.value)
  }
  const handleY = (e) => {
    setVertY(e.target.value)
  }
  const handleZ = (e) => {
    setVertZ(e.target.value)
  }
  const handleNMantos = (e) => {
    setNMantos(e.target.value)
  }
  const handleClipping = (e) => {
    setClipping(!clipping)
  }
  const handleCP0 = (e) => {
    setClipPlane0(e.target.value)
  }
  const handleCP1 = (e) => {
    setClipPlane1(e.target.value)
  }

  // Componente para manejar la rotación de la cámara
  const RotatingCamera = ({ rotationEnabled }) => {
    const cameraRef = useRef()

    useFrame(({ camera }) => {
      if (rotationEnabled) {
        cameraRef.current = camera
        const rotationSpeed = 0.00005 // Velocidad de rotación
        const radius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2)
        const time = performance.now() * rotationSpeed
        camera.position.x = radius * Math.sin(time)
        camera.position.z = radius * Math.cos(time)
        camera.lookAt(0, 0, 0) // La cámara siempre mira al centro
      }
    })

    return null
  }

  // Manejador para el checkbox de configuración
  const handleConfigurable = (e) => {
    const isConfigurable = e.target.checked
    setConfigurable(isConfigurable)
    
    if (!isConfigurable) {
      // Resetear a valores iniciales
      setNMantos(configurations[0].nMantos)
      setVertX(configurations[0].vertX)
      setVertY(configurations[0].vertY)
      setVertZ(configurations[0].vertZ)
      setClipPlane0(configurations[0].clipPlane0)
      setClipPlane1(configurations[0].clipPlane1)
      setConfigIndex(0)
    }
  }

  return (
    <div className='static' onClick={handleInteraction} onTouchStart={handleInteraction}>
      {ConfigHypar(
        segments, handleSegments, 
        vertX, handleX, 
        vertY, handleY, 
        vertZ, handleZ, 
        nMantos, handleNMantos, 
        clipping, handleClipping, 
        clipPlane0, handleCP0, 
        clipPlane1, handleCP1,
        configurable, handleConfigurable,
        configurations[configIndex].hypar
      )}
      <Canvas 
        camera={{ position: [-25, 18.5, 25], fov: 50 }} 
        className='z-30' 
        onCreated={(state) => {
          state.gl.localClippingEnabled = true
          
          state.scene.background = new THREE.Color('#E1E2E9')
        }}
      >
        <Suspense fallback={<Html center>...cargando</Html>}>
          <ambientLight intensity={Math.PI / 8} />
          <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
          <OrbitControls makeDefault dampingFactor={0.3} />
          {/* <Environment preset='sunset' /> */}
          <RotatingCamera rotationEnabled={rotationEnabled} />
          {/* <LineaPrueba /> */}
          {/* Rejilla de base TODO: agregar useState dentro de HandleX y HandleY para actualizar sizeGrid */}
          {/* <gridHelper args={[(vertX > vertY ? vertX : vertY), (vertX > vertY ? vertX : vertY), 0xff0000, 'teal']} /> */}
          {/* Componente de Hypar con los params X, Y y Z */}
          <Ruled1 seg={segments} vertexX={vertX} vertexY={vertY} vertexZ={vertZ} mantos={nMantos} clipping={clipping} cp0={clipPlane0} cp1={clipPlane1} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Canvasapp
