import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { ConfigHypar } from './ConfigHypar'
import { Ruled0 } from './Ruled0'

export const Canvasapp = () => {
  const [segments, setSegments] = useState(60)
  const [vertX, setVertX] = useState(20)
  const [vertY, setVertY] = useState(10)
  const [vertZ, setVertZ] = useState(28)
  const [nMantos, setNMantos] = useState(4)
  const [clipping, setClipping] = useState(true)
  const [clipPlane0, setClipPlane0] = useState(8)
  const [clipPlane1, setClipPlane1] = useState(5)
  const [rotationEnabled, setRotationEnabled] = useState(true) // Control del giro automático
  const [lastInteraction, setLastInteraction] = useState(Date.now()) // Tiempo de última interacción

  // Definir las diferentes configuraciones
  const configurations = [
    { nMantos: 4, vertX: 20, vertY: 10, vertZ: 28, clipPlane0: 8, clipPlane1: 5 },
    { nMantos: 6, vertX: 30, vertY: 15, vertZ: 35, clipPlane0: 15, clipPlane1: 10 },
    { nMantos: 8, vertX: 25, vertY: 20, vertZ: 40, clipPlane0: 20, clipPlane1: 15 },
    { nMantos: 3, vertX: 15, vertY: 25, vertZ: 30, clipPlane0: 10, clipPlane1: 8 }
  ]

  const [configIndex, setConfigIndex] = useState(0)

  // Función para actualizar los estados gradualmente
  const animateToNewValues = useCallback((targetConfig) => {
    const steps = 60 // Número de pasos para la animación
    const duration = 2000 // Duración de la animación en ms
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
    const interval = setInterval(() => {
      const nextIndex = (configIndex + 1) % configurations.length
      setConfigIndex(nextIndex)
      animateToNewValues(configurations[nextIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [configIndex, animateToNewValues])

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
        const rotationSpeed = 0.00005 // Velocidad de rotaci��n
        const radius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2)
        const time = performance.now() * rotationSpeed
        camera.position.x = radius * Math.sin(time)
        camera.position.z = radius * Math.cos(time)
        camera.lookAt(0, 0, 0) // La cámara siempre mira al centro
      }
    })

    return null
  }

  return (
    <div className='static' onClick={handleInteraction} onTouchStart={handleInteraction}>
      {ConfigHypar(segments, handleSegments, vertX, handleX, vertY, handleY, vertZ, handleZ, nMantos, handleNMantos, clipping, handleClipping, clipPlane0, handleCP0, clipPlane1, handleCP1)}
      <Canvas camera={{ position: [-15, 12.5, 15], fov: 35 }} className='z-30' onCreated={(state) => (state.gl.localClippingEnabled = true)}>
        <Suspense fallback={<Html center>...cargando</Html>}>
          <ambientLight intensity={Math.PI / 8} />
          <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]} shadow-mapSize={128} />
          <OrbitControls makeDefault dampingFactor={0.3} />
          <Environment preset='sunset' />
          <RotatingCamera rotationEnabled={rotationEnabled} />

          {/* Rejilla de base TODO: agregar useState dentro de HandleX y HandleY para actualizar sizeGrid */}
          {/* <gridHelper args={[(vertX > vertY ? vertX : vertY), (vertX > vertY ? vertX : vertY), 0xff0000, 'teal']} /> */}
          {/* Componente de Hypar con los params X, Y y Z */}
          <Ruled0 seg={segments} vertexX={vertX} vertexY={vertY} vertexZ={vertZ} mantos={nMantos} clipping={clipping} cp0={clipPlane0} cp1={clipPlane1} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Canvasapp
