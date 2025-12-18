/* eslint-disable import/order */
import { createFileRoute } from '@tanstack/react-router'
import raw from './../static/nestedCheckboxes.dummy.json'
import type { CheckboxNode, CheckboxTree } from '@/components/CheckBoxesList'
import CheckBoxesList from '@/components/CheckBoxesList'
import { useState } from 'react'

export const Route = createFileRoute('/nestedCheckbox')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = raw as CheckboxTree
  const [checkedItems, setCheckedItems] = useState({})
  type CheckedMap = Record<string, boolean>
  const selectAll = (node: CheckboxNode, toggledOn: boolean): CheckedMap => {
    return (node.children ?? []).reduce<CheckedMap>((acc, child) => {
      const childId = String(child.id)
      const descendants = selectAll(child, toggledOn)
      return { ...acc, [childId]: toggledOn, ...descendants }
    }, {})
  }
  const applyParentState = (roots: CheckboxTree, map: CheckedMap) => {
    const next = { ...map }
    const apply = (node: CheckboxNode): boolean => {
      const id = String(node.id)
      if (!node.children?.length) return !!next[id]
      const childVals = node.children.map(apply)
      const allTrue = childVals.every(Boolean)
      const allFalse = childVals.every((v) => !v)

      if (allTrue) {
        next[id] = true
      } else if (allFalse) {
        next[id] = false
      }

      return !!next[id]
    }
    roots.forEach(apply)
    return next
  }
  const handleOnChange = (node: CheckboxNode) => {
    setCheckedItems((prev: Record<string, boolean>) => {
      const toggedOn = !prev[node.id]
      let newState = { ...prev, [node.id]: toggedOn }
      if (node.children) {
        const subTree = selectAll(node, toggedOn)
        newState = { ...newState, ...subTree }
      }
      newState = applyParentState(data, newState)
      return newState
    })
  }

  return (
    <div className="p-4">
      <CheckBoxesList {...{ items: data, checkedItems, handleOnChange }} />
    </div>
  )
}
