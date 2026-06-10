import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

const particles = [
  ['10%', '28%', 0.2], ['18%', '72%', 1.1], ['82%', '24%', 0.7],
  ['88%', '67%', 1.5], ['68%', '88%', 0.4], ['35%', '8%', 1.8],
  ['48%', '92%', 1.3], ['92%', '44%', 2.1],
] as const

const heartPath =
  'M250 438 C215 400 58 302 58 164 C58 72 171 35 229 119 C240 135 247 151 250 165 C253 151 260 135 271 119 C329 35 442 72 442 164 C442 302 285 400 250 438 Z'

export function HeartKGAnimation() {
  return (
    <motion.section className="heart-animation" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .8 }}>
      <div className="heart-stage">
        <div className="heart-aura" />
        {particles.map(([left, top, delay], index) => (
          <motion.span
            key={index}
            className="heart-particle"
            style={{ left, top }}
            animate={{ y: [0, -10, 0], scale: [0.7, 1.35, 0.7], opacity: [0.3, 1, 0.3], rotate: [0, 30, 0] }}
            transition={{ duration: 2.6, delay, repeat: Infinity }}
          >
            {index % 3 === 0 ? <Heart size={12} fill="currentColor" /> : <Sparkles size={index % 2 ? 11 : 16} />}
          </motion.span>
        ))}
        <motion.svg
          viewBox="0 0 500 500"
          className="neon-heart"
          aria-hidden="true"
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="heart-gradient" x1="0%" y1="15%" x2="100%" y2="85%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="48%" stopColor="#f43f7d" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
          <motion.path
            className="heart-blur-line"
            d={heartPath}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, .75, .45] }}
            transition={{ duration: 4.8, times: [0, .58, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
          />
          <motion.path
            className="heart-main-line"
            d={heartPath}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, .82] }}
            transition={{ duration: 4.8, times: [0, .58, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
          />
        </motion.svg>
        <motion.div
          className="kg-letters"
          initial={{ opacity: 0, scale: 0.65, y: 12 }}
          animate={{ opacity: 1, scale: [0.65, 1.08, 1], y: 0 }}
          transition={{ delay: 2, duration: .9, type: 'spring', stiffness: 130 }}
        >
          <strong>K</strong><span>&amp;</span><strong>G</strong>
        </motion.div>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
        K &amp; G — nossa história, nossa música, nosso caminho.
      </motion.p>
    </motion.section>
  )
}
