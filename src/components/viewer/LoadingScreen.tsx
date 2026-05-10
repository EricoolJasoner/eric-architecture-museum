import { motion } from 'framer-motion'

/**
 * Animated SVG silhouette of the Empire State Building drawing itself in,
 * shown while the heavier 3D canvas chunk lazy-loads.
 */
export function LoadingScreen() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 2, ease: 'easeInOut' }, opacity: { duration: 0.3 } },
    },
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <motion.svg
        width="160"
        height="220"
        viewBox="0 0 160 220"
        initial="hidden"
        animate="visible"
        className="text-amber-300 drop-shadow-[0_0_24px_rgba(251,191,36,0.4)]"
      >
        {/* Foundation block */}
        <motion.path
          d="M 30 200 L 30 178 L 130 178 L 130 200 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          variants={draw}
        />
        {/* Lower shaft */}
        <motion.path
          d="M 42 178 L 42 130 L 118 130 L 118 178"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          variants={draw}
        />
        {/* Setback band */}
        <motion.path
          d="M 48 130 L 48 124 L 112 124 L 112 130"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          variants={draw}
        />
        {/* Main shaft */}
        <motion.path
          d="M 54 124 L 54 70 L 106 70 L 106 124"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          variants={draw}
        />
        {/* Setback steps */}
        <motion.path
          d="M 60 70 L 60 64 L 100 64 L 100 70"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          variants={draw}
        />
        <motion.path
          d="M 66 64 L 66 58 L 94 58 L 94 64"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          variants={draw}
        />
        <motion.path
          d="M 72 58 L 72 52 L 88 52 L 88 58"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          variants={draw}
        />
        {/* Mooring mast */}
        <motion.path
          d="M 74 52 L 74 42 L 86 42 L 86 52"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          variants={draw}
        />
        {/* Pod */}
        <motion.path
          d="M 76 42 L 76 36 L 84 36 L 84 42"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          variants={draw}
        />
        {/* Tapered spire */}
        <motion.path
          d="M 78 36 L 80 24 L 82 36"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          variants={draw}
        />
        {/* Antenna */}
        <motion.path
          d="M 80 24 L 80 8"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="none"
          variants={draw}
        />
        {/* Beacon */}
        <motion.circle
          cx="80"
          cy="6"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 1.6, duration: 1.6, repeat: Infinity }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70 mb-1.5">
          Eric's Youth Daily
        </div>
        <div className="text-sm font-medium text-slate-200">
          Constructing the Empire State Building…
        </div>
        <motion.div
          className="mt-4 mx-auto h-0.5 w-32 rounded-full bg-amber-300/20 overflow-hidden"
        >
          <motion.div
            className="h-full bg-amber-300"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
