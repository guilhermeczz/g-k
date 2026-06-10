export type JourneyStep = {
  id: number
  title: string
  eyebrow: string
  question: string
  options: string[]
  answers: string[]
  successMessage: string
}

export type Screen = 'intro' | 'journey' | 'transition' | 'final'
