import React from 'react'
import { ReactKeypress } from './ReactKeypress'

interface PanelDProps {
  isVisible: boolean
  onToggle: () => void
  isMounted: boolean
}

export const PanelD: React.FC<PanelDProps> = ({
  isVisible,
  onToggle,
  isMounted,
}) => {
  return (
    <ReactKeypress.Item
      keys="shift d"
      onPress={onToggle}
      description="toggle D"
      componentId="panel-d"
      enabled={true}
      visible={isMounted}
    >
      <div
        className={`${
          isVisible ? 'bg-blue-600' : 'bg-gray-600 opacity-50'
        } text-white text-6xl flex items-center justify-center cursor-pointer border border-white min-h-full`}
        onClick={onToggle}
      >
        D
      </div>
    </ReactKeypress.Item>
  )
}
