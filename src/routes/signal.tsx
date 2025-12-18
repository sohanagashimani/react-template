import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/signal')({
  component: RouteComponent,
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function RouteComponent() {
  const data = [
    {
      value: 'RED',
      name: 'red',
      color: 'bg-red-500',
      isOn: false,
    },
    {
      value: 'YELLOW',
      name: 'yellow',
      color: 'bg-yellow-500',
      isOn: false,
    },
    {
      value: 'GREEN',
      name: 'green',
      color: 'bg-green-500',
      isOn: false,
    },
  ]

  const [lights, setLights] = useState(data)
  const [currentColor, setCurrentColor] = useState<string | null>(null)

  const handleCurrentSignal = (item: { value: string }) => {
    setCurrentColor(item.value)
  }

  const handleAutoPlay = async () => {
    for (const item of lights) {
      setLights((prev) =>
        prev.map((light) => ({
          ...light,
          isOn: light.value === item.value ? true : light.isOn,
        })),
      )

      await delay(2000)
    }
  }

  const handleReset = () => {
    setLights((prev) => prev.map((light) => ({ ...light, isOn: false })))
    setCurrentColor(null)
  }
  return (
    <div className="p-5">
      <div className="flex flex-col gap-3">
        {lights.map((item) => {
          return (
            <div
              key={item.value}
              onClick={() => handleCurrentSignal(item)}
              className={`${item.isOn || currentColor === item.value ? item.color : `bg-transparent`} border border-gray-500 rounded-full p-5 w-fit`}
            ></div>
          )
        })}
        <button
          type="button"
          className="w-fit border p-5 rounded-md border-gray-500"
          onClick={handleAutoPlay}
        >
          AutoPlay
        </button>
        <button
          type="button"
          className="w-fit border p-5 rounded-md border-gray-500"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
