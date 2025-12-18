import { createFileRoute } from '@tanstack/react-router'
import FileExplorer from '@/components/FileExplorer'

export const Route = createFileRoute('/fileExplorer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FileExplorer />
}
