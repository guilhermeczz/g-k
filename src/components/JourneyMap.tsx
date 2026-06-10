import { motion } from 'framer-motion'
import { Check, Heart, LockKeyhole, Mail, MoonStar, MousePointer2, Music2, Sparkles } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import type { JourneyStep } from '../types'
import { PixelGirlCharacter } from './PixelGirlCharacter'

type Point = { x: number; y: number }

type JourneyMapProps = {
  steps: JourneyStep[]
  currentStep: number
  completedSteps: number[]
  isPaused: boolean
  onReachHeart: () => void
}

const heartPositions: Point[] = [
  { x: 25, y: 18 },
  { x: 72, y: 35 },
  { x: 30, y: 52 },
  { x: 70, y: 70 },
  { x: 42, y: 88 },
]

const petals = [
  ['8%', '8%', 0], ['82%', '11%', 1.2], ['15%', '29%', 2.1], ['91%', '36%', .6],
  ['7%', '51%', 1.6], ['86%', '58%', 2.8], ['17%', '76%', .9], ['91%', '83%', 2.2],
] as const

const memoryScenes = [
  { className: 'scene-one', icon: Mail, title: 'A primeira mensagem', text: 'onde tudo começou' },
  { className: 'scene-two', icon: MoonStar, title: 'Nosso encontro', text: 'sob o céu da madrugada' },
  { className: 'scene-three', icon: Music2, title: 'Nossa trilha sonora', text: 'cada música lembra você' },
] as const

export function JourneyMap({
  steps,
  currentStep,
  completedSteps,
  isPaused,
  onReachHeart,
}: JourneyMapProps) {
  const worldRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Point>({ x: 49, y: 5 })
  const [target, setTarget] = useState<Point>({ x: 49, y: 5 })
  const [isWalking, setIsWalking] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [clickMarker, setClickMarker] = useState<Point | null>(null)

  function moveCharacter(event: MouseEvent<HTMLDivElement>) {
    if (isPaused || !worldRef.current) return
    const interactive = (event.target as HTMLElement).closest('.heart-checkpoint')
    if (interactive) return
    const bounds = worldRef.current.getBoundingClientRect()
    const next = {
      x: Math.max(5, Math.min(95, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(3, Math.min(96, ((event.clientY - bounds.top) / bounds.height) * 100)),
    }
    setDirection(next.x < target.x ? 'left' : 'right')
    setClickMarker(next)
    setTarget(next)
    setIsWalking(true)
  }

  function walkToHeart(index: number) {
    if (isPaused || index + 1 !== currentStep) return
    setDirection(heartPositions[index].x < target.x ? 'left' : 'right')
    setClickMarker(heartPositions[index])
    setTarget(heartPositions[index])
    setIsWalking(true)
  }

  function finishMovement() {
    setPosition(target)
    setIsWalking(false)
    const activeHeart = heartPositions[currentStep - 1]
    const distance = Math.hypot(target.x - activeHeart.x, target.y - activeHeart.y)
    if (distance < 7) onReachHeart()
  }

  return (
    <section className="game-section" aria-label="Mapa jogável da jornada">
      <header className="game-header">
        <div>
          <p className="section-kicker">Nossa pequena aventura</p>
          <h2>Caminhe até o próximo coração</h2>
        </div>
        <div className="game-instruction">
          <MousePointer2 size={18} />
          <span><strong>Clique no caminho</strong> para mover a karininha</span>
        </div>
      </header>

      <div className="game-progress">
        <span style={{ width: `${(completedSteps.length / steps.length) * 100}%` }} />
        <p>{completedSteps.length} de {steps.length} memórias encontradas</p>
      </div>

      <div className="game-viewport">
        <div
          className={`game-world ${isPaused ? 'is-paused' : ''}`}
          ref={worldRef}
          onClick={moveCharacter}
        >
          <div className="world-glow world-glow-one" />
          <div className="world-glow world-glow-two" />
          <div className="world-stars" />
          <div className="moon-decoration">
            <MoonStar size={34} />
            <span>Nosso céu</span>
          </div>
          {petals.map(([left, top, delay], index) => (
            <motion.span
              key={`${left}-${top}`}
              className="falling-petal"
              style={{ left, top }}
              animate={{ y: [0, 22, 0], x: [0, index % 2 ? 12 : -12, 0], rotate: [0, 120, 240], opacity: [.35, .8, .35] }}
              transition={{ duration: 5 + (index % 3), delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          <div className="botanical-silhouette botanical-left"><i /><i /><i /><i /></div>
          <div className="botanical-silhouette botanical-right"><i /><i /><i /><i /></div>
          <div className="light-ribbon ribbon-one" />
          <div className="light-ribbon ribbon-two" />
          <div className="constellation constellation-one"><i /><i /><i /><i /><i /></div>
          <div className="constellation constellation-two"><i /><i /><i /><i /></div>
          {memoryScenes.map(({ className, icon: Icon, title, text }, index) => (
            <motion.aside
              key={title}
              className={`memory-scene ${className}`}
              initial={{ opacity: 0, scale: .9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: .5 }}
              transition={{ delay: index * .15 }}
            >
              <span><Icon size={17} /></span>
              <div><strong>{title}</strong><small>{text}</small></div>
            </motion.aside>
          ))}
          <svg className="romantic-path" viewBox="0 0 1000 1500" preserveAspectRatio="none" aria-hidden="true">
            <path className="path-shadow" d="M490 60 C180 120 120 250 250 280 S870 360 720 530 S120 640 300 780 S880 940 700 1070 S200 1240 420 1380" />
            <motion.path
              className="path-highlight"
              d="M490 60 C180 120 120 250 250 280 S870 360 720 530 S120 640 300 780 S880 940 700 1070 S200 1240 420 1380"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </svg>

          {steps.map((step, index) => {
            const checkpoint = heartPositions[index]
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === step.id
            return (
              <motion.button
                key={step.id}
                className={`heart-checkpoint ${isCompleted ? 'is-completed' : ''} ${isCurrent ? 'is-current' : 'is-locked'}`}
                style={{ left: `${checkpoint.x}%`, top: `${checkpoint.y}%` }}
                onClick={(event) => {
                  event.stopPropagation()
                  walkToHeart(index)
                }}
                animate={isCurrent ? { scale: [1, 1.13, 1] } : undefined}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-label={`Fase ${step.id}: ${step.title}`}
              >
                <span className="checkpoint-ring" />
                <span className="checkpoint-icon">
                  {isCompleted ? <Check size={23} strokeWidth={3} /> : isCurrent ? <Heart size={28} fill="currentColor" /> : <LockKeyhole size={20} />}
                </span>
                <span className="checkpoint-label">
                  <small>Fase {step.id}</small>
                  <strong>{step.title}</strong>
                </span>
                {isCurrent && <Sparkles className="checkpoint-sparkle" size={18} />}
              </motion.button>
            )
          })}

          {clickMarker && !isPaused && (
            <motion.span
              key={`${clickMarker.x}-${clickMarker.y}`}
              className="click-marker"
              style={{ left: `${clickMarker.x}%`, top: `${clickMarker.y}%` }}
              initial={{ opacity: 1, scale: 0.25 }}
              animate={{ opacity: 0, scale: 1.7 }}
              transition={{ duration: 0.8 }}
            />
          )}

          <motion.div
            className={`playable-girl faces-${direction} ${isWalking ? 'is-walking' : ''}`}
            initial={false}
            animate={{ left: `${target.x}%`, top: `${target.y}%` }}
            transition={{ duration: Math.max(0.5, Math.hypot(target.x - position.x, target.y - position.y) / 26), ease: [0.25, 0.1, 0.25, 1] }}
            onAnimationComplete={finishMovement}
          >
            <span className="girl-direction">
              <PixelGirlCharacter compact />
            </span>
            <span className="girl-name">K</span>
          </motion.div>

          <div className="journey-finish">
            <span className="finish-gate"><Heart size={24} fill="currentColor" /></span>
            <div><strong>Destino final</strong><small>uma surpresa espera por você</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
