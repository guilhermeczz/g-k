import { motion } from 'framer-motion'
import { ExternalLink, Pause, SkipBack, SkipForward } from 'lucide-react'

export function SpotifyLoveCard() {
  return (
    <motion.article
      className="music-card"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="music-cover-wrap">
        <img src="/spot.jpeg" alt="Capa da nossa música" />
        <span>nossa música</span>
      </div>
      <div className="music-info">
        <div>
          <p>TOCANDO AGORA</p>
          <h3>The First Time</h3>
          <h4>Damiano David</h4>
        </div>
        <div className="progress-track"><span /></div>
        <div className="music-times"><span>1:14</span><span>3:38</span></div>
        <div className="music-controls" aria-hidden="true">
          <SkipBack size={17} fill="currentColor" />
          <span><Pause size={17} fill="currentColor" /></span>
          <SkipForward size={17} fill="currentColor" />
        </div>
        <a
          className="listen-button"
          href="https://open.spotify.com/search/The%20First%20Time%20Damiano%20David"
          target="_blank"
          rel="noreferrer"
        >
          Ouvir nossa música <ExternalLink size={15} />
        </a>
      </div>
    </motion.article>
  )
}
