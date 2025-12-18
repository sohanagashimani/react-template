// Simple mocked API for saving feedback
export type SaveFeedbackResult =
  | {
      ok: true
      savedAt: number
    }
  | {
      ok: false
      error: string
    }

export async function saveFeedback(
  candidateId: string,
  text: string,
): Promise<SaveFeedbackResult> {
  // Simulate network latency 400-900ms
  const latency = 400 + Math.floor(Math.random() * 500)
  await new Promise((r) => setTimeout(r, latency))

  // Simulate occasional failure
  const shouldFail = Math.random() < 0.1
  if (shouldFail) {
    return { ok: false, error: 'Network error. Please try again.' }
  }

  return { ok: true, savedAt: Date.now() }
}
