import { motion } from 'framer-motion'

interface Props {
  onEnter: () => void
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2.4, ease: 'easeInOut' }, opacity: { duration: 0.35 } },
  },
}

export function IntroScreen({ onEnter }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onEnter}
      className="fixed inset-0 z-[80] overflow-hidden bg-[#03070a] text-left outline-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Enter architecture museum"
    >
      <div
        className="absolute inset-0 scale-[1.04] bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(3,7,10,0.44) 0%, rgba(3,7,10,0.2) 38%, rgba(3,7,10,0.88) 100%), url('/nyc-night-reference.jpg')",
          filter: 'saturate(0.75) contrast(1.08)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(251,191,36,0.18),transparent_34%),linear-gradient(90deg,rgba(3,7,10,0.88),rgba(3,7,10,0.2)_48%,rgba(3,7,10,0.88))]" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-3xl flex-col items-center"
        >
          <motion.svg
            width="210"
            height="278"
            viewBox="0 0 160 220"
            initial="hidden"
            animate="visible"
            className="text-amber-200 drop-shadow-[0_0_36px_rgba(251,191,36,0.38)]"
          >
            <motion.path d="M 30 200 L 30 178 L 130 178 L 130 200 Z" stroke="currentColor" strokeWidth="1.5" fill="none" variants={draw} />
            <motion.path d="M 42 178 L 42 130 L 118 130 L 118 178" stroke="currentColor" strokeWidth="1.5" fill="none" variants={draw} />
            <motion.path d="M 48 130 L 48 124 L 112 124 L 112 130" stroke="currentColor" strokeWidth="1.5" fill="none" variants={draw} />
            <motion.path d="M 54 124 L 54 70 L 106 70 L 106 124" stroke="currentColor" strokeWidth="1.5" fill="none" variants={draw} />
            <motion.path d="M 60 70 L 60 64 L 100 64 L 100 70" stroke="currentColor" strokeWidth="1.3" fill="none" variants={draw} />
            <motion.path d="M 66 64 L 66 58 L 94 58 L 94 64" stroke="currentColor" strokeWidth="1.3" fill="none" variants={draw} />
            <motion.path d="M 72 58 L 72 52 L 88 52 L 88 58" stroke="currentColor" strokeWidth="1.3" fill="none" variants={draw} />
            <motion.path d="M 74 52 L 74 42 L 86 42 L 86 52" stroke="currentColor" strokeWidth="1.3" fill="none" variants={draw} />
            <motion.path d="M 76 42 L 76 36 L 84 36 L 84 42" stroke="currentColor" strokeWidth="1.3" fill="none" variants={draw} />
            <motion.path d="M 78 36 L 80 24 L 82 36" stroke="currentColor" strokeWidth="1.3" fill="none" variants={draw} />
            <motion.path d="M 80 24 L 80 8" stroke="currentColor" strokeWidth="1.2" fill="none" variants={draw} />
            <motion.circle
              cx="80"
              cy="6"
              r="2.6"
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1.5, duration: 1.7, repeat: Infinity }}
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mt-8 text-center"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.44em] text-amber-200/78">
              Eric's Youth Daily
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Architecture Field Museum
            </h1>
            <div className="mx-auto mt-5 h-px w-56 overflow-hidden rounded-full bg-white/14">
              <motion.div
                className="h-full w-24 bg-amber-200"
                initial={{ x: '-100%' }}
                animate={{ x: '260%' }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <motion.div
              className="mt-7 inline-flex h-11 items-center rounded-lg border border-amber-200/35 bg-amber-200 px-5 text-xs font-bold uppercase tracking-[0.22em] text-slate-950 shadow-[0_18px_60px_rgba(251,191,36,0.22)]"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              Enter
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.button>
  )
}
