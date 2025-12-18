import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HelpContainer, ReactKeypress } from '../components/ReactKeypress'
import { PanelA } from '../components/PanelA'
import { PanelB } from '../components/PanelB'
import { PanelC } from '../components/PanelC'
import { PanelD } from '../components/PanelD'

export const Route = createFileRoute('/keypress')({
  component: RouteComponent,
})

function RouteComponent() {
  const [visibleA, setVisibleA] = useState(true)
  const [visibleB, setVisibleB] = useState(true)
  const [visibleC, setVisibleC] = useState(true)

  const [mountedD, setMountedD] = useState(true)
  const [visibleD, setVisibleD] = useState(true)

  const toggleA = () => setVisibleA((prev) => !prev)
  const toggleB = () => setVisibleB((prev) => !prev)
  const toggleC = () => setVisibleC((prev) => !prev)
  const toggleD = () => setVisibleD((prev) => !prev)
  const toggleMountD = () => {
    setMountedD((prev) => {
      const newMounted = !prev
      if (newMounted) {
        setVisibleD(true)
      }
      return newMounted
    })
  }

  return (
    <ReactKeypress>
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-200px)] mb-4">
          <PanelA isVisible={visibleA} onToggle={toggleA} />
          <PanelB isVisible={visibleB} onToggle={toggleB} />
          <PanelC isVisible={visibleC} onToggle={toggleC} />
          {mountedD ? (
            <PanelD
              isVisible={visibleD}
              onToggle={toggleD}
              isMounted={mountedD}
            />
          ) : (
            <div className="min-h-full" />
          )}
        </div>

        <div className="flex justify-between items-start">
          <button
            onClick={toggleMountD}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {mountedD ? 'Unmount D' : 'Mount D'}
          </button>

          <div className="text-right">
            <HelpContainer />
          </div>
        </div>
      </div>
    </ReactKeypress>
  )
}
