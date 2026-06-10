import { motion } from 'framer-motion'

const hearts = [
  { left: '5%', delay: 0, size: 12, duration: 12 },
  { left: '16%', delay: 4, size: 8, duration: 15 },
  { left: '31%', delay: 8, size: 10, duration: 13 },
  { left: '48%', delay: 2, size: 7, duration: 16 },
  { left: '67%', delay: 6, size: 11, duration: 14 },
  { left: '82%', delay: 1, size: 8, duration: 17 },
  { left: '94%', delay: 9, size: 12, duration: 13 },
]

export function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart, index) => (
        <motion.span
          key={index}
          className="floating-heart"
          style={{ left: heart.left, width: heart.size, height: heart.size }}
          initial={{ y: '105vh', opacity: 0, rotate: 45 }}
          animate={{
            y: '-15vh',
            opacity: [0, 0.55, 0.55, 0],
            x: [0, index % 2 ? 35 : -28, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
