import {animated, useSpring} from "@react-spring/web"
import {easePolyOut} from "d3-ease"
import {useEffect, memo, useRef} from "react"
import {Candidate} from "../types"

interface RouletteProps {
  candidates: Candidate[]
  spin: boolean
}

const PI = 3.1415

const calcDashWidth = (radius: number, numSlots: number) => {
  return (radius * PI * 2) / numSlots
}


export function Roulette({candidates, spin}: RouletteProps) {
  const radius = 100
  const numSlots = candidates.length
  const [styles, _api] = useSpring(() => ({
    from: {y: 0},
    delay: 2000,
    config: {
      easing: easePolyOut,
      duration: 10000
    }
  }))

  const circleProps = {
    r: radius,
    cx: 0,
    cy: 0
  }

  const dashWidth = calcDashWidth(circleProps.r, numSlots)
  const svgConfig = {
    width: 400,
    height: 400
  }

  const translateCood = {
    x: svgConfig.width / 2,
    y: svgConfig.height / 2
  }

  const initialRotate =
    numSlots % 2 === 0
      ? (numSlots / 2) % 2 === 0
        ? 360 / numSlots / 2
        : 0
      : 90

  const prevSpinIt = useRef<boolean>()

  useEffect(() => {
    if (!prevSpinIt.current && spin) {
      styles.y.start({
        from: 0,
        to: 360 * 8 + 360 * Math.random(),
      })
    }
    prevSpinIt.current = spin
  }, [spin, styles.y, numSlots, candidates])

  return (
    <>
      <svg width={svgConfig.width} height={svgConfig.height}>
        <animated.g
          transform={
            spin
              ? styles.y.to(function (y) {
                return `rotate(${y}, ${translateCood.x + circleProps.cx}, ${translateCood.y + circleProps.cy}) translate(${translateCood.x}, ${translateCood.y})`
              })
              : `translate(${translateCood.x}, ${translateCood.y})`
          }
        >
          <g
            transform={`rotate(${initialRotate}, ${circleProps.cx} ${circleProps.cy})`}
          >
            <circle
              r={circleProps.r}
              cx={circleProps.cx}
              cy={circleProps.cy}
              fill="bisque"
              stroke="#01B3ED"
              strokeWidth={`${circleProps.r}`}
              strokeDasharray={`${dashWidth} ${dashWidth}`}
            />
            <g
              transform={`rotate(${360 / numSlots}, ${circleProps.cx} ${
                circleProps.cy
              })`}
            >
              <circle
                r={circleProps.r}
                cx={circleProps.cx}
                cy={circleProps.cy}
                fill="none"
                stroke="#B34E7E"
                strokeWidth={`${circleProps.r}`}
                strokeDasharray={`${dashWidth} ${dashWidth}`}
              />
            </g>
            {numSlots % 2 !== 0 ? (
              <g
                transform={`rotate(${360 / numSlots}, ${circleProps.cx} ${
                  circleProps.cy
                })`}
              >
                <circle
                  r={circleProps.r}
                  cx={circleProps.cx}
                  cy={circleProps.cy}
                  fill="none"
                  stroke="#FFF8B8"
                  strokeWidth={`${circleProps.r}`}
                  strokeDasharray={`${dashWidth} ${dashWidth * (numSlots - 1)}`}
                />
              </g>
            ) : null}
          </g>
          {candidates.map((candidate, index) => (
            <g
              transform={`rotate(${(360 / numSlots) * index}, ${circleProps.cx}, ${
                circleProps.cy
              }) translate(0, ${-radius * 1.5 + 25})`}
              key={index}
            >
              <text x={0} y={0} textAnchor="middle">
                {candidate.name}
              </text>
            </g>
          ))}
        </animated.g>
        <g
          transform={`rotate(180, 10, 20) translate(${
            -translateCood.x + 10
          }, -10)`}
        >
          <polygon
            points="10,0 0,20 20,20"
            style={{fill: "red"}}
          />
        </g>
      </svg>
    </>
  )
}
