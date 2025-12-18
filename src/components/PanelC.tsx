import React from 'react'
import { Panel } from './Panel'

interface PanelCProps {
  isVisible: boolean
  onToggle: () => void
}

export const PanelC: React.FC<PanelCProps> = ({ isVisible, onToggle }) => {
  return <Panel letter="C" isVisible={isVisible} onToggle={onToggle} />
}
