import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { saveFeedback } from '../api/feedback'
import SaveStatus from './SaveStatus'

type Props = {
  candidateId: string
  initialText?: string
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function FeedbackForm({ candidateId, initialText = '' }: Props) {
  const [text, setText] = useState(initialText)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const isSavingRef = useRef(false)
  const lastManuallySavedAtRef = useRef<number | null>(null)

  const debouncedText = useDebounce(text, 2000)

  const canSave = useMemo(
    () => !isSavingRef.current && text.trim().length > 0,
    [text],
  )

  const runSave = useCallback(
    async (source: 'auto' | 'manual') => {
      if (isSavingRef.current) return
      isSavingRef.current = true
      setSaveState('saving')
      setErrorMessage(null)

      const result = await saveFeedback(candidateId, text)
      isSavingRef.current = false

      if (result.ok) {
        setSaveState('saved')
        setSavedAt(result.savedAt)
        if (source === 'manual') {
          lastManuallySavedAtRef.current = result.savedAt
          // Show transient success message for manual saves only
          // Using alert for simplicity; replace with your toast system if present
          // eslint-disable-next-line no-alert
          alert('Feedback saved')
        }
      } else {
        setSaveState('error')
        setErrorMessage(result.error)
        // eslint-disable-next-line no-alert
        alert(`Save failed: ${result.error}`)
      }
    },
    [candidateId, text],
  )

  // Auto-save when debounced text changes (user stopped typing for 2s)
  useEffect(() => {
    if (debouncedText !== text) return
    if (text.trim().length === 0) return
    runSave('auto')
  }, [debouncedText])

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Candidate Feedback</h2>
        <SaveStatus status={saveState} savedAt={savedAt ?? undefined} />
      </div>

      <label style={{ display: 'grid', gap: 8 }}>
        <span>Feedback</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share strengths, areas to improve, and hiring recommendation..."
          rows={8}
          style={{
            width: '100%',
            fontSize: 14,
            padding: 10,
            borderRadius: 6,
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
        />
      </label>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => runSave('manual')}
          disabled={!canSave}
          style={{
            opacity: canSave ? 1 : 0.6,
            cursor: canSave ? 'pointer' : 'not-allowed',
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #999',
            background: '#f5f5f5',
          }}
        >
          {saveState === 'saving' ? 'Saving…' : 'Save'}
        </button>

        {errorMessage ? (
          <span style={{ color: '#b00020', fontSize: 12 }}>
            Last error: {errorMessage}
          </span>
        ) : null}
      </div>
    </div>
  )
}
