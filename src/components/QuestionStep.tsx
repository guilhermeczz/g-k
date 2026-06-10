import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Heart, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { JourneyStep } from '../types'

type QuestionStepProps = {
  step: JourneyStep
  onComplete: (step: number) => void
  onContinue: () => void
}

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()

export function QuestionStep({ step, onComplete, onContinue }: QuestionStepProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const requiredSelections = step.answers.length

  useEffect(() => {
    setSelected([])
    setResult(null)
  }, [step.id])

  function choose(option: string) {
    if (result === 'correct') return
    setResult(null)
    let next = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]

    if (next.length > requiredSelections) next = [option]
    setSelected(next)

    if (next.length !== requiredSelections) return
    const isCorrect = next.every((item) =>
      step.answers.some((answer) => normalize(answer) === normalize(item)),
    )
    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) onComplete(step.id)
  }

  return (
    <motion.div className="question-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section
        className="question-card glass-card"
        initial={{ opacity: 0, y: 35, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        <div className="question-topline">
          <span>Memória encontrada · Fase {step.id} de 5</span>
          <span className="step-dots">
            {[1, 2, 3, 4, 5].map((dot) => <i key={dot} className={dot <= step.id ? 'dot-active' : ''} />)}
          </span>
        </div>
        <motion.div className="question-icon" animate={{ rotate: [-5, 5, -5], scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <Heart size={24} fill="currentColor" />
        </motion.div>
        <p className="question-eyebrow">{step.eyebrow}</p>
        <h2>{step.title}</h2>
        <h3>{step.question}</h3>
        {requiredSelections > 1 && (
          <div className="multi-answer-note">
            <Sparkles size={16} />
            Escolha as <strong>2 respostas corretas</strong> · {selected.length}/2 selecionadas
          </div>
        )}

        <div className="options-grid">
          {step.options.map((option, index) => {
            const isSelected = selected.includes(option)
            const isWrong = isSelected && result === 'wrong'
            const isCorrect = isSelected && result === 'correct'
            return (
              <motion.button
                key={option}
                className={`option-button ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => choose(option)}
                whileHover={result !== 'correct' ? { y: -3, scale: 1.01 } : undefined}
                whileTap={result !== 'correct' ? { scale: 0.98 } : undefined}
              >
                <span>{isSelected ? <Check size={15} /> : String.fromCharCode(65 + index)}</span>
                {option}
                {isCorrect && <Check className="option-status" size={18} />}
                {isWrong && <X className="option-status" size={18} />}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {result === 'wrong' && (
            <motion.div className="feedback feedback-wrong" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <Heart size={17} /> Quase, meu amor… tenta mais uma vez
            </motion.div>
          )}
          {result === 'correct' && (
            <motion.div className="success-box" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
              <Sparkles size={21} /><p>{step.successMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {result === 'correct' && (
          <motion.button className="primary-button continue-button" onClick={onContinue} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }}>
            {step.id === 5 ? 'Desbloquear surpresa' : 'Voltar ao caminho'} <ArrowRight size={18} />
          </motion.button>
        )}
      </motion.section>
    </motion.div>
  )
}
