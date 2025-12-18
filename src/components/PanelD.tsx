import React from 'react'
import { Panel } from './Panel'

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
    <Panel
      letter="D"
      isVisible={isVisible}
      onToggle={onToggle}
      showInHelp={isMounted}
    />
  )
}
