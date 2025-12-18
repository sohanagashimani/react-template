import { useState } from 'react'
import RenderList from './RenderList'
import type { IFileExplorer, IFileExplorerItem } from '@/models/IFileExplorer'
import staticData from '@/static/fileStructure.dummy.json'

const FileExplorer = () => {
  const [data, setData] = useState<IFileExplorer | null>({ items: staticData })
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})

  const addNoteToList = (item: IFileExplorerItem) => {
    const updateTree = (
      items: Array<IFileExplorerItem>,
      newItem: IFileExplorerItem,
    ): Array<IFileExplorerItem> => {
      if (newItem.parentId === undefined) {
        return [...items, newItem]
      }
      return items.map((i) => {
        if (i.id === newItem.parentId) {
          return { ...i, children: [...(i.children ?? []), newItem] }
        }
        if (i.children) {
          return { ...i, children: updateTree(i.children, newItem) }
        }
        return i
      })
    }

    setData({ ...data, items: updateTree(data?.items || [], item) })
  }
  const [name, setName] = useState<string>('')
  const [isAdding, setIsAdding] = useState<null | { isFolder: boolean }>(null)
  const onToggleItem = (id: string) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }
  const collapseAll = () => {
    setIsOpen({})
  }
  const expandAll = () => {
    const buildExpandedState = (
      items: Array<IFileExplorerItem>,
    ): Record<string, boolean> => {
      return items.reduce<Record<string, boolean>>((acc, item) => {
        if (item.isFolder) {
          acc[item.id] = true
          if (item.children) {
            return { ...acc, ...buildExpandedState(item.children) }
          }
        }
        return acc
      }, {})
    }

    setIsOpen(buildExpandedState(data?.items || []))
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {data && (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              className="border cursor-pointer border-gray-300"
              onClick={() => setIsAdding({ isFolder: true })}
            >
              Add Folder
            </button>
            <button
              type="button"
              className="border cursor-pointer border-gray-300 mr-2"
              onClick={() => {
                setName('')
                setIsAdding({ isFolder: false })
              }}
            >
              Add File
            </button>{' '}
            <button
              onClick={expandAll}
              className="border cursor-pointer border-gray-300"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="border cursor-pointer border-gray-300"
            >
              Collapse All
            </button>
            {isAdding && (
              <input
                type="text"
                className="border border-gray-300"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {isAdding && (
              <button
                type="button"
                className="border cursor-pointer border-gray-300"
                onClick={() => {
                  setIsAdding(null)
                  setName('')
                }}
              >
                Cancel
              </button>
            )}
            {isAdding && (
              <button
                type="button"
                className="border cursor-pointer border-gray-300"
                onClick={() => {
                  setIsAdding(null)
                  setName('')
                  addNoteToList({
                    id: crypto.randomUUID(),
                    name,
                    isFolder: isAdding.isFolder,
                  })
                }}
              >
                Save
              </button>
            )}
          </div>
          <RenderList
            items={data.items}
            onCreateNewFileOrFolder={addNoteToList}
            isOpen={isOpen}
            onToggleItem={onToggleItem}
          />
        </>
      )}
    </div>
  )
}

export default FileExplorer
