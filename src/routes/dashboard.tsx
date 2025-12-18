import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

type Submission = {
  id: number
  candidateName: string
  challengeTitle: string
  status: 'passed' | 'failed' | 'in-progress'
  score: number
}

type DashboardProps = {
  submissions: Array<Submission>
}

export function Dashboard({ submissions }: DashboardProps) {
  const [filter, setFilter] = useState<
    'all' | 'passed' | 'failed' | 'in-progress'
  >('all')
  const [open, setOpen] = useState(false)

  const filtered = submissions.filter((s) =>
    filter === 'all' ? true : s.status === filter,
  )

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Submissions Dashboard</h2>

      {/* Dropdown filter (BUG: no outside click close, no Esc close) */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <button onClick={() => setOpen(!open)}>Filter: {filter}</button>
        {open && (
          <ul
            style={{
              position: 'absolute',
              background: '#fff',
              border: '1px solid #ccc',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              width: '150px',
            }}
          >
            {['all', 'passed', 'failed', 'in-progress'].map((f) => (
              <li
                key={f}
                style={{ padding: '0.5rem', cursor: 'pointer' }}
                onClick={() => {
                  setFilter(f as any)
                  setOpen(false)
                }}
              >
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Naïve list rendering */}
      <table border={1} cellPadding={6} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Challenge</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                No submissions found.
              </td>
            </tr>
          ) : (
            filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.candidateName}</td>
                <td>{s.challengeTitle}</td>
                <td>{s.status}</td>
                <td>{s.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function RouteComponent() {
  return (
    <div>
      <Dashboard submissions={[]} />
    </div>
  )
}
