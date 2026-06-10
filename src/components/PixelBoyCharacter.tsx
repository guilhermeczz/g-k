import { motion } from 'framer-motion'

type PixelBoyCharacterProps = {
  compact?: boolean
}

export function PixelBoyCharacter({ compact = false }: PixelBoyCharacterProps) {
  return (
    <motion.div
      className={`pixel-boy-wrap ${compact ? 'pixel-boy-compact' : ''}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Gui esperando na porta"
      role="img"
    >
      <div className="boy-shadow" />
      <div className="pixel-boy">
        <div className="boy-hair-back" />
        <div className="boy-face">
          <i className="boy-eye boy-eye-left" />
          <i className="boy-eye boy-eye-right" />
          <i className="boy-blush boy-blush-left" />
          <i className="boy-blush boy-blush-right" />
          <i className="boy-smile" />
        </div>
        <div className="boy-curls"><i /><i /><i /><i /><i /></div>
        <div className="boy-body"><div className="boy-shirt-detail" /></div>
        <div className="boy-arm boy-arm-left" />
        <div className="boy-arm boy-arm-right" />
        <div className="boy-leg boy-leg-left" />
        <div className="boy-leg boy-leg-right" />
      </div>
    </motion.div>
  )
}
