import { createFileRoute } from '@tanstack/react-router'
import FeedbackForm from '../components/FeedbackForm'

export const Route = createFileRoute('/auto-save-form')({
  component: RouteComponent,
})

function RouteComponent() {
  // For demo purposes, hardcode a candidateId
  const candidateId = 'cand_12345'
  return (
    <div style={{ padding: 16 }}>
      <FeedbackForm candidateId={candidateId} />
    </div>
  )
}
