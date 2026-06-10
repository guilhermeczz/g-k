import { motion } from 'framer-motion'
import { Heart, RotateCcw, Sparkles } from 'lucide-react'
import { HeartKGAnimation } from './HeartKGAnimation'
import { SpotifyLoveCard } from './SpotifyLoveCard'

type FinalSurpriseProps = {
  onRestart: () => void
}

export function FinalSurprise({ onRestart }: FinalSurpriseProps) {
  return (
    <motion.main
      className="final-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <header className="final-hero">
        <motion.div
          className="tiny-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={13} /> Destino desbloqueado
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Você chegou <em>até mim</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          “Se eu pudesse escolher qualquer caminho de novo, escolheria todos os
          que me levassem até você.”
        </motion.p>
      </header>

      <section className="memory-grid">
        <motion.figure
          className="photo-card"
          initial={{ opacity: 0, x: -24, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="photo-frame">
            <img src="/foto-principal.jpeg" alt="Nossa primeira foto juntos" />
          </div>
          <figcaption><Heart size={15} fill="currentColor" /> Nossa primeira foto juntos</figcaption>
        </motion.figure>
        <SpotifyLoveCard />
      </section>

      <HeartKGAnimation />

      <motion.button
        className="restart-button"
        onClick={onRestart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <RotateCcw size={16} /> Recomeçar jornada
      </motion.button>
    </motion.main>
  )
}
