import { motion } from 'framer-motion';
import AnimatedBackground from '../AnimatedBackground';
import FloatingCodeBlocks from '../FloatingCodeBlocks';
import Button from '../Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <AnimatedBackground />
      <FloatingCodeBlocks />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          Trusted by Developers Worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
        >
          <span className="gradient-text">AI Powered</span>
          <br />
          <span className="text-white">Code Review Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-text-muted sm:text-l"
        >
          Instantly analyze your codebase, discover bugs, identify security risks, and improve performance using next-generation AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" to="/register">
            Start Reviewing
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg" to="/login">
            Login
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 w-full max-w-4xl"
        >
          <div className="glass-card glow-purple overflow-hidden rounded-2xl p-1">
            <div className="rounded-xl bg-black/60 p-6 text-left font-mono text-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-text-muted">analysis.ts</span>
              </div>
              <pre className="text-emerald-400/90">
                <code>{`// CodeLens AI Analysis
const review = await codeLens.analyze({
  language: "typescript",
  checks: ["bugs", "performance", "security"]
});

console.log(review.score); // 94/100
review.suggestions.forEach(fix => apply(fix));`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
