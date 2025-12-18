import { useState } from 'react'
import type { IFileExplorerItem } from '@/models/IFileExplorer'

const RenderList = ({
  items,
  onCreateNewFileOrFolder,
  isOpen,
  onToggleItem,
}: {
  items: Array<IFileExplorerItem>
  onCreateNewFileOrFolder: (item: IFileExplorerItem) => void
  isOpen: Record<string, boolean>
  onToggleItem: (itemId: string) => void
}) => {
  const [name, setName] = useState<string>(items[0].name)
  const [isEditing, setIsEditing] = useState<{
    id: string
    isFolder: boolean
  } | null>(null)
  return (
    <div className="flex flex-col pl-4 border-l border-gray-300 ">
      {items.map((item) => {
        return (
          <div key={item.id} className="">
            {item.isFolder && item.children && (
              <span
                className="pr-2 cursor-pointer"
                onClick={() => onToggleItem(item.id)}
              >
                {isOpen[item.id] ? '▼' : '▶'}
              </span>
            )}
            {item.name}
            {isEditing?.id === item.id && (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border border-gray-300"
                  name={item.id}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <button
                  type="button"
                  className="border cursor-pointer border-gray-300"
                  onClick={() => {
                    onCreateNewFileOrFolder({
                      id: crypto.randomUUID(),
                      name: name,
                      isFolder: isEditing.isFolder,
                      parentId: item.id,
                    })
                    setIsEditing(null)
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="border cursor-pointer border-gray-300"
                  onClick={() => setIsEditing(null)}
                >
                  Cancel
                </button>
              </div>
            )}
            {item.isFolder && (
              <span className="ml-2">
                <span
                  className="cursor-pointer text-sm"
                  onClick={() => setIsEditing({ id: item.id, isFolder: true })}
                >
                  📁
                </span>
                <span
                  className="cursor-pointer text-sm"
                  onClick={() => setIsEditing({ id: item.id, isFolder: false })}
                >
                  📄
                </span>
              </span>
            )}
            {item.children && isOpen[item.id] && (
              <RenderList
                items={item.children}
                onCreateNewFileOrFolder={onCreateNewFileOrFolder}
                isOpen={isOpen}
                onToggleItem={onToggleItem}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default RenderList
