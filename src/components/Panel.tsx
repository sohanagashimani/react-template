import React from 'react'
import { ReactKeypress } from './ReactKeypress'

interface PanelProps {
  letter: string
  isVisible: boolean
  onToggle: () => void
  showInHelp?: boolean
}

export const Panel: React.FC<PanelProps> = ({
  letter,
  isVisible,
  onToggle,
  showInHelp = true,
}) => {
  const lowerLetter = letter.toLowerCase()

  return (
    <ReactKeypress.Item
      keys={`shift ${lowerLetter}`}
      onPress={onToggle}
      description={`toggle ${letter}`}
      componentId={`panel-${lowerLetter}`}
      enabled={true}
      visible={showInHelp}
    >
      <div
        className={`${
          isVisible ? 'bg-blue-600' : 'bg-gray-600 opacity-50'
        } text-white text-6xl flex items-center justify-center cursor-pointer border border-white min-h-full`}
        onClick={onToggle}
      >
        {letter}
      </div>
    </ReactKeypress.Item>
  )
}
