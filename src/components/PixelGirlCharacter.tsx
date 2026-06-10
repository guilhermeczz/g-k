import { motion } from 'framer-motion'

type PixelGirlCharacterProps = {
  compact?: boolean
}

export function PixelGirlCharacter({ compact = false }: PixelGirlCharacterProps) {
  return (
    <motion.div
      className={`pixel-girl-wrap ${compact ? 'pixel-girl-compact' : ''}`}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Bonequinha caminhando pela jornada"
      role="img"
    >
      <div className="pixel-shadow" />
      <div className="pixel-girl">
        <div className="pixel-bow"><span /></div>
        <div className="pixel-hair-back" />
        <div className="pixel-face">
          <i className="eye eye-left" />
          <i className="eye eye-right" />
          <i className="blush blush-left" />
          <i className="blush blush-right" />
          <i className="smile" />
        </div>
        <div className="pixel-bangs" />
        <div className="pixel-body">
          <div className="pixel-collar" />
        </div>
        <div className="pixel-arm arm-left" />
        <div className="pixel-arm arm-right" />
        <div className="pixel-leg leg-left" />
        <div className="pixel-leg leg-right" />
      </div>
    </motion.div>
  )
}
