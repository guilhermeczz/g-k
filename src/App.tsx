import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FinalSurprise } from './components/FinalSurprise'
import { FloatingHearts } from './components/FloatingHearts'
import { IntroScreen } from './components/IntroScreen'
import { JourneyMap } from './components/JourneyMap'
import { LastStepScreen } from './components/LastStepScreen'
import { QuestionStep } from './components/QuestionStep'
import { journeySteps } from './data/journey'
import type { Screen } from './types'

function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [questionOpen, setQuestionOpen] = useState(false)

  const step = journeySteps[currentStep - 1]

  function completeStep(stepId: number) {
    setCompletedSteps((previous) =>
      previous.includes(stepId) ? previous : [...previous, stepId],
    )
  }

  function continueJourney() {
    if (currentStep < journeySteps.length) {
      setCurrentStep((previous) => previous + 1)
      setQuestionOpen(false)
      return
    }
    setQuestionOpen(false)
    setScreen('transition')
  }

  function restart() {
    setCurrentStep(1)
    setCompletedSteps([])
    setQuestionOpen(false)
    setScreen('intro')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <IntroScreen key="intro" onStart={() => setScreen('journey')} />
        )}
        {screen === 'journey' && (
          <motion.main
            key="journey"
            className="journey-screen screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <JourneyMap
              steps={journeySteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              isPaused={questionOpen}
              onReachHeart={() => setQuestionOpen(true)}
            />
            <AnimatePresence>
              {questionOpen && (
                <QuestionStep
                  step={step}
                  onComplete={completeStep}
                  onContinue={continueJourney}
                />
              )}
            </AnimatePresence>
          </motion.main>
        )}
        {screen === 'transition' && (
          <LastStepScreen
            key="transition"
            onUnlock={() => {
              setScreen('final')
              window.scrollTo({ top: 0 })
            }}
          />
        )}
        {screen === 'final' && <FinalSurprise key="final" onRestart={restart} />}
      </AnimatePresence>
    </div>
  )
}

export default App
