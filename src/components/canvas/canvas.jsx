import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { ConfigHypar } from './ConfigHypar'
import { Ruled1 } from './Ruled1'
import { QuadraticB } from './QuadraticB'
import { NurbsSurface } from './SurfaceNurbs'
import * as THREE from 'three'

export const Canvasapp = () => {
  const [segments, setSegments] = useState(80)
  const [vertX, setVertX] = useState(22)
  const [vertY, setVertY] = useState(14)
  const [vertZ, setVertZ] = useState(26)
  const [nMantos, setNMantos] = useState(3)
  const [clipping, setClipping] = useState(true)
  const [clipPlane0, setClipPlane0] = useState(16)
  const [clipPlane1, setClipPlane1] = useState(5)
  const [rotationEnabled, setRotationEnabled] = useState(true) // Control del giro automático
  const [lastInteraction, setLastInteraction] = useState(Date.now()) // Tiempo de última interacción
  const [configurable, setConfigurable] = useState(false)
  const [showSurface, setShowSurface] = useState(false)
  const [key, setKey] = useState(0) // Agregamos estado para forzar el remontaje

  // Definir las diferentes configuraciones
  const configurations = [
    { hypar: 'Pabellón Oslo', nMantos: 3, vertX: 22, vertY: 14, vertZ: 26, clipPlane0: 16, clipPlane1: 5 },
    { hypar: 'Casino de la Selva', nMantos: 5, vertX: 30, vertY: 10, vertZ: 27, clipPlane0: 25, clipPlane1: 7.5 },
    { hypar: 'San Antonio de las Huertas', nMantos: 4, vertX: 30, vertY: 14, vertZ: 43, clipPlane0: 0, clipPlane1: 9 },
    { hypar: 'Manantiales', nMantos: 8, vertX: 37, vertY: 9, vertZ: 26, clipPlane0: 19, clipPlane1: 12 }
  ]

  const [configIndex, setConfigIndex] = useState(0)

  // Función para forzar el remontaje
  const remountRuled = useCallback(() => {
    setKey(prevKey => prevKey + 1)
  }, [])

  // Función para actualizar los estados gradualmente
  const animateToNewValues = useCallback((targetConfig) => {
    const steps = 30 // Reducimos los pasos de 60 a 30
    const duration = 150 // Reducimos la duración de 200ms a 150ms
    const stepDuration = duration / steps
    let currentStep = 0
    let animationFrameId

    const initialValues = {
      nMantos,
      vertX,
      vertY,
      vertZ,
      clipPlane0,
      clipPlane1
    }

    const animate = () => {
      currentStep++
      // Usamos una función de easing para suavizar la transición
      const progress = easeInOutCubic(currentStep / steps)

      // Interpolación con la función de easing
      setNMantos(Math.round(initialValues.nMantos + (targetConfig.nMantos - initialValues.nMantos) * progress))
      setVertX(Math.round(initialValues.vertX + (targetConfig.vertX - initialValues.vertX) * progress))
      setVertY(Math.round(initialValues.vertY + (targetConfig.vertY - initialValues.vertY) * progress))
      setVertZ(Math.round(initialValues.vertZ + (targetConfig.vertZ - initialValues.vertZ) * progress))
      setClipPlane0(initialValues.clipPlane0 + (targetConfig.clipPlane0 - initialValues.clipPlane0) * progress)
      setClipPlane1(initialValues.clipPlane1 + (targetConfig.clipPlane1 - initialValues.clipPlane1) * progress)

      // Forzar remontaje en cada paso de la animación
      remountRuled()

      if (currentStep < steps) {
        animationFrameId = requestAnimationFrame(() => setTimeout(animate, stepDuration))
      }
    }

    // Función de easing cúbica
    const easeInOutCubic = (x) => {
      return x < 0.5
        ? 4 * x * x * x
        : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [nMantos, vertX, vertY, vertZ, clipPlane0, clipPlane1, remountRuled])

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

  // Reanudar rotación después de 5 segundos de inactividad
  useEffect(() => {
    const interval = setInterval(() => {
      if (!rotationEnabled && Date.now() - lastInteraction > 5000) {
        setRotationEnabled(true)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [rotationEnabled, lastInteraction])

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
    const isConfigurable = !configurable
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
  const handleShowSurface = (e) => {
    setShowSurface(!showSurface)
  }

  // Limpieza de recursos
  useEffect(() => {
    return () => {
      // Limpiar texturas y materiales al desmontar
      THREE.Cache.clear()

      // Limpiar el renderizador
      const renderer = document.querySelector('canvas')?.getContext('webgl')
      if (renderer) {
        renderer.getExtension('WEBGL_lose_context')?.loseContext()
      }
    }
  }, [])

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
        showSurface, handleShowSurface,
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
          <Environment preset='sunset' />
          <RotatingCamera rotationEnabled={rotationEnabled} />
          {/* <QuadraticB
            segments={segments}
            vertX={vertX}
            vertY={vertY}
            vertZ={vertZ}
          /> */}
          {showSurface ? (
            <NurbsSurface
              key={key}
              vertX={vertX}
              vertY={vertY}
              vertZ={vertZ}
              mantos={nMantos}
              cp0={clipPlane0}
              cp1={clipPlane1}
            />
          ) : (
            <Ruled1
              key={key}
              seg={segments}
              vertexX={vertX}
              vertexY={vertY}
              vertexZ={vertZ}
              mantos={nMantos}
              clipping={clipping}
              cp0={clipPlane0}
              cp1={clipPlane1}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Canvasapp
