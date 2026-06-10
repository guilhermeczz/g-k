import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { PixelBoyCharacter } from './PixelBoyCharacter'
import { PixelGirlCharacter } from './PixelGirlCharacter'

type LastStepScreenProps = { onUnlock: () => void }
type Scene = 'crossing' | 'entering' | 'portal' | 'hold'

const memories = [
  'Nosso primeiro oi',
  'Nosso primeiro encontro',
  'Nosso primeiro eu te amo',
  'Nossos sonhos',
  'Tudo que ainda vamos viver',
]

const trailParticles = [...Array(20)].map((_, index) => ({
  left: `${4 + index * 3.7}%`,
  delay: 1.2 + index * 0.14,
  size: 3 + (index % 4),
}))

export function LastStepScreen({ onUnlock }: LastStepScreenProps) {
  const [scene, setScene] = useState<Scene>('crossing')
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [interactionReady, setInteractionReady] = useState(false)
  const crossingX = useMotionValue(4)
  const crossingLeft = useTransform(crossingX, (value) => `${value}%`)
  const trailScale = useTransform(crossingX, [4, 77], [0, 1])
  const frameRef = useRef<number | null>(null)
  const startedAtRef = useRef(0)
  const progressAtStartRef = useRef(0)
  const currentProgressRef = useRef(0)

  useEffect(() => {
    if (scene !== 'crossing') return
    crossingX.set(4)
    const controls = animate(crossingX, 77, {
      delay: 1,
      duration: 5.2,
      ease: [0.42, 0, 0.25, 1],
      onComplete: () => setScene('entering'),
    })
    return () => controls.stop()
  }, [crossingX, scene])

  useEffect(() => {
    if (scene !== 'hold') return
    setInteractionReady(false)
    const timer = window.setTimeout(() => setInteractionReady(true), 2200)
    return () => window.clearTimeout(timer)
  }, [scene])

  useEffect(() => {
    if (!holding || unlocked) return
    startedAtRef.current = performance.now()
    progressAtStartRef.current = currentProgressRef.current
    const advance = (now: number) => {
      const next = Math.min(100, progressAtStartRef.current + ((now - startedAtRef.current) / 4200) * 100)
      currentProgressRef.current = next
      setProgress(next)
      if (next >= 100) {
        setHolding(false)
        setUnlocked(true)
        window.setTimeout(onUnlock, 1900)
        return
      }
      frameRef.current = requestAnimationFrame(advance)
    }
    frameRef.current = requestAnimationFrame(advance)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [holding, onUnlock, unlocked])

  const stopHolding = () => setHolding(false)
  const visibleMemories = Math.min(memories.length, Math.floor(progress / 20))

  return (
    <motion.main className={`screen last-step-screen scene-${scene}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}>
      <AnimatePresence mode="wait">
        {scene === 'crossing' && (
          <motion.section key="crossing" className="crossing-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8 }}>
            <div className="night-stars" />
            <motion.div className="crossing-copy" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }}>
              <p>O último passo</p>
              <h1>Karinha, ele está esperando por você.</h1>
            </motion.div>
            <div className="crossing-ground">
              <motion.div
                className="pink-trail"
                style={{ scaleX: trailScale }}
              />
              {trailParticles.map((particle, index) => (
                <motion.i
                  key={index}
                  className="trail-spark"
                  style={{ left: particle.left, width: particle.size, height: particle.size }}
                  initial={{ opacity: 0, y: 8, scale: .3 }}
                  animate={{ opacity: [0, 1, 0], y: [8, -18 - (index % 3) * 7, -32], scale: [0.3, 1.3, 0.4] }}
                  transition={{ delay: 1.15 + index * .25, duration: 1.5 }}
                />
              ))}
              {[...Array(8)].map((_, index) => (
                <motion.i
                  key={index}
                  className="pink-smoke"
                  style={{ left: `${8 + index * 9}%` }}
                  initial={{ opacity: 0, scale: .4, x: 0 }}
                  animate={{ opacity: [0, .45, 0], scale: [0.4, 1.5, 2], x: [0, 25, 45] }}
                  transition={{ delay: 1.35 + index * .62, duration: 2.5 }}
                />
              ))}
            </div>
            <motion.div
              className="crossing-karinha is-auto-walking"
              style={{ left: crossingLeft, bottom: '13%' }}
            >
              <span className="character-name">Karinha</span><PixelGirlCharacter compact />
            </motion.div>
            <div className="crossing-destination">
              <div className="cinematic-door"><div><Heart size={29} fill="currentColor" /></div></div>
              <div className="crossing-gui"><span className="character-name">Gui</span><PixelBoyCharacter compact /></div>
            </div>
          </motion.section>
        )}

        {scene === 'entering' && (
          <motion.section key="entering" className="entering-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }}>
            <div className="night-stars" />
            <motion.p className="entering-message" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>Finalmente, juntos.</motion.p>
            <motion.div
              className="entrance-door"
              initial={{ scale: .9 }}
              animate={{ scale: [0.9, 1, 1.04] }}
              transition={{ duration: 2.5 }}
            >
              <motion.div
                className="entrance-door-panel"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -76 }}
                transition={{ delay: .65, duration: 1.1, ease: 'easeInOut' }}
              />
              <Heart size={34} fill="currentColor" />
            </motion.div>
            <motion.div
              className="entering-couple"
              initial={{ opacity: 1, y: 75, scale: 1 }}
              animate={{ opacity: [1, 1, 0], y: [75, 15, -15], scale: [1, .72, .25] }}
              transition={{ delay: 1.5, duration: 2.2, ease: 'easeInOut' }}
              onAnimationComplete={() => setScene('portal')}
            >
              <div><PixelGirlCharacter compact /></div>
              <Heart size={15} fill="currentColor" />
              <div><PixelBoyCharacter compact /></div>
            </motion.div>
            <motion.div className="entrance-flash" initial={{ opacity: 0, scale: .4 }} animate={{ opacity: [0, 0, .9, 0], scale: [0.4, .4, 1.4, 2] }} transition={{ delay: 2.7, duration: 1.2 }} />
          </motion.section>
        )}

        {scene === 'portal' && (
          <motion.section key="portal" className="portal-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }}>
            <div className="portal-bloom" />
            <motion.div className="portal-door" initial={{ scale: .35, opacity: 0 }} animate={{ scale: [0.35, 1, 1.05], opacity: 1 }} transition={{ duration: 1.4 }}>
              <motion.div className="portal-door-panel" initial={{ rotateY: 0 }} animate={{ rotateY: -78 }} transition={{ delay: 1.2, duration: 1.1, ease: 'easeInOut' }} />
              <Heart size={42} fill="currentColor" />
            </motion.div>
            <motion.div className="portal-couple" initial={{ opacity: 0, scale: .2, y: -40 }} animate={{ opacity: [0, 1, 1], scale: [0.2, .65, 1], y: [-40, 30, 135] }} transition={{ delay: 2, duration: 2.5, ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={() => setScene('hold')}>
              <div><PixelGirlCharacter compact /></div><Heart size={15} fill="currentColor" /><div><PixelBoyCharacter compact /></div>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>Juntos, eles atravessaram para o próximo capítulo…</motion.p>
          </motion.section>
        )}

        {scene === 'hold' && (
          <motion.section key="hold" className="hold-final-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="last-step-stars" />
            <motion.header className="last-step-copy" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
              <p className="section-kicker">O último passo</p>
              <h1>Agora abra a nossa memória mais importante</h1>
              <p>Vocês chegaram juntos. Falta apenas abrir o coração.</p>
            </motion.header>
            <div className={`couple-outside-door ${unlocked ? 'is-unlocked' : ''}`}>
              <div className="mini-final-door"><Heart size={22} fill="currentColor" /></div>
              <motion.div
                className="outside-couple"
                initial={{ opacity: 0, y: -62, scale: .45 }}
                animate={{ opacity: [0, 1, 1], y: [-62, -20, 0], scale: [.45, .82, 1] }}
                transition={{ delay: .4, duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="outside-karinha"><span className="character-name">Karinha</span><PixelGirlCharacter compact /></div>
                <div className="outside-gui"><span className="character-name">Gui</span><PixelBoyCharacter compact /></div>
              </motion.div>
            </div>
            <AnimatePresence>
              {interactionReady && (
                <motion.div className="hold-interaction" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="memory-reveal-list">
                    {memories.map((memory, index) => (
                      <motion.span key={memory} className={index < visibleMemories ? 'is-visible' : ''} animate={index < visibleMemories ? { opacity: 1, y: 0 } : { opacity: .22, y: 3 }}>
                        <Sparkles size={11} /> {memory}
                      </motion.span>
                    ))}
                  </div>
                  <button
                    className={`hold-heart ${holding ? 'is-holding' : ''} ${unlocked ? 'is-complete' : ''}`}
                    onPointerDown={() => !unlocked && setHolding(true)}
                    onPointerUp={stopHolding}
                    onPointerLeave={stopHolding}
                    onPointerCancel={stopHolding}
                    onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && !unlocked) setHolding(true) }}
                    onKeyUp={stopHolding}
                  >
                    <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="hold-track" cx="60" cy="60" r="53" /><circle className="hold-progress" cx="60" cy="60" r="53" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} /></svg>
                    <Heart size={38} fill="currentColor" />
                  </button>
                  <p className="hold-instruction">{unlocked ? 'O caminho até nós está aberto…' : holding ? 'Continue segurando…' : 'Mantenha o coração pressionado'}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {unlocked && [...Array(18)].map((_, index) => (
              <motion.i key={index} className="unlock-particle" initial={{ left: '50%', top: '72%', opacity: 1, scale: .4 }} animate={{ x: Math.cos(index) * (90 + index * 6), y: Math.sin(index) * (70 + index * 5), opacity: 0, scale: 1.4 }} transition={{ duration: 1.5, ease: 'easeOut' }} />
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  )
}
