import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { PixelGirlCharacter } from './PixelGirlCharacter'

type IntroScreenProps = {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.main
      className="screen intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      <motion.div
        className="intro-card glass-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="tiny-label"><Heart size={13} fill="currentColor" /> Feito para você</div>
        <PixelGirlCharacter />
        <p className="script-line">Uma jornada pela nossa história</p>
        <h1>O Caminho <em>Até Você</em></h1>
        <p className="intro-copy">
          Preparei uma pequena jornada para você. Cada fase guarda um pedacinho
          da nossa história. Se você acertar tudo, vai desbloquear sua surpresa
          final.
        </p>
        <motion.button
          className="primary-button"
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Começar jornada <ArrowRight size={18} />
        </motion.button>
        <span className="intro-footnote">5 memórias esperam por você</span>
      </motion.div>
    </motion.main>
  )
}
