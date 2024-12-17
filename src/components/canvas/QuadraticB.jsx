import { QuadraticBezierLine } from '@react-three/drei'
import { planosDeCorte } from './planosDeCorte'

export function QuadraticB ({ segments, vertX, vertY, vertZ }) {
  const segVertX = (vertX / segments)
  const segVertY = (vertY / segments)
  const scale = 4 * vertZ / (segments ** 2)
  return (
    <>
      {/* Arrays de las parábolas negativas */}
      {Array.from({ length: (segments / 2) + 1 }).map((_, i) => {
        return (
          <QuadraticBezierLine
            key={i}
            start={[-segVertX * i * 2, -vertZ + (scale * i ** 2), -vertY]}
            mid={[-segVertX * i * 2, vertZ + (scale * i ** 2), 0]}
            end={[-segVertX * i * 2, -vertZ + (scale * i ** 2), vertY]}
            segments={100}
            color='red'
            lineWidth={1}
          />
        )
      })}
      {Array.from({ length: (segments / 2) + 1 }).map((_, i) => {
        return (
          <QuadraticBezierLine
            key={i}
            start={[segVertX * i * 2, -vertZ + (scale * i ** 2), -vertY]}
            mid={[segVertX * i * 2, vertZ + (scale * i ** 2), 0]}
            end={[segVertX * i * 2, -vertZ + (scale * i ** 2), vertY]}
            segments={100}
            color='red'
            lineWidth={1}
          />
        )
      })}
      {/* Arrays de las parábolas positivas */}
      {Array.from({ length: (segments / 2) + 1 }).map((_, i) => {
        return (
          <QuadraticBezierLine
            key={i}
            start={[-vertX, vertZ + (-scale * i ** 2), segVertY * i * 2]}
            mid={[0, -vertZ + (-scale * i ** 2), segVertY * i * 2]}
            end={[vertX, vertZ + (-scale * i ** 2), segVertY * i * 2]}
            segments={100}
            color='red'
            lineWidth={1}
          />
        )
      })}
      {Array.from({ length: (segments / 2) + 1 }).map((_, i) => {
        return (
          <QuadraticBezierLine
            key={i}
            start={[-vertX, vertZ + (-scale * i ** 2), -segVertY * i * 2]}
            mid={[0, -vertZ + (-scale * i ** 2), -segVertY * i * 2]}
            end={[vertX, vertZ + (-scale * i ** 2), -segVertY * i * 2]}
            segments={100}
            color='red'
            lineWidth={1}
          />
        )
      })}
      {/* Una parábola positiva en 0 (versión antes del array) se expresa así:
            <QuadraticBezierLine
            start={
              [-vertX, vertZ, 0]
            }
            mid={
              [0, -vertZ, 0]
            }
            end={
              [vertX, vertZ, 0]
            }
            segments={100}
            color="red"
            lineWidth={1} />
            */}
    </>
  )
}
