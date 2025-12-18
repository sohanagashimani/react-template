import React from 'react'
import { ReactKeypress } from './ReactKeypress'

interface PanelBProps {
  isVisible: boolean
  onToggle: () => void
}

export const PanelB: React.FC<PanelBProps> = ({ isVisible, onToggle }) => {
  return (
    <ReactKeypress.Item
      keys="shift b"
      onPress={onToggle}
      description="toggle B"
      componentId="panel-b"
      enabled={true}
      visible={true}
    >
      <div
        className={`${
          isVisible ? 'bg-blue-600' : 'bg-gray-600 opacity-50'
        } text-white text-6xl flex items-center justify-center cursor-pointer border border-white min-h-full`}
        onClick={onToggle}
      >
        B
      </div>
    </ReactKeypress.Item>
  )
}
