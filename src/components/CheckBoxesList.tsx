export type CheckboxNode = {
  id: number
  name: string
  children?: Array<CheckboxNode>
}

export type CheckboxTree = Array<CheckboxNode>
const CheckBoxesList = ({
  items,
  checkedItems,
  handleOnChange,
}: {
  items: CheckboxTree
  checkedItems: Record<string, boolean>
  handleOnChange: (node: CheckboxNode) => void
}) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <div className="pl-4" key={item.id}>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name={item.name}
                id={item.name}
                checked={checkedItems[item.id] || false}
                onChange={() => {
                  handleOnChange(item)
                }}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
            {item.children && (
              <CheckBoxesList
                {...{ items: item.children, checkedItems, handleOnChange }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CheckBoxesList
