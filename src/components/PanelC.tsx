import React from 'react'
import { ReactKeypress } from './ReactKeypress'

interface PanelCProps {
  isVisible: boolean
  onToggle: () => void
}

export const PanelC: React.FC<PanelCProps> = ({ isVisible, onToggle }) => {
  return (
    <ReactKeypress.Item
      keys="shift c"
      onPress={onToggle}
      description="toggle C"
      componentId="panel-c"
      enabled={true}
      visible={true}
    >
      <div
        className={`${
          isVisible ? 'bg-blue-600' : 'bg-gray-600 opacity-50'
        } text-white text-6xl flex items-center justify-center cursor-pointer border border-white min-h-full`}
        onClick={onToggle}
      >
        C
      </div>
    </ReactKeypress.Item>
  )
}
