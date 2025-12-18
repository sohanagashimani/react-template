export interface IFileExplorer {
  items: Array<IFileExplorerItem>
}

export interface IFileExplorerItem {
  id: string
  name: string
  isFolder: boolean
  children?: Array<IFileExplorerItem>
  parentId?: string
}
