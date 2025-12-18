import React from 'react'
import { ReactKeypress } from './ReactKeypress'

interface PanelAProps {
  isVisible: boolean
  onToggle: () => void
}

export const PanelA: React.FC<PanelAProps> = ({ isVisible, onToggle }) => {
  return (
    <ReactKeypress.Item
      keys="shift a"
      onPress={onToggle}
      description="toggle A"
      componentId="panel-a"
      enabled={true}
      visible={true}
    >
      <div
        className={`${
          isVisible ? 'bg-blue-600' : 'bg-gray-600 opacity-50'
        } text-white text-6xl flex items-center justify-center cursor-pointer border border-white min-h-full`}
        onClick={onToggle}
      >
        A
      </div>
    </ReactKeypress.Item>
  )
}
