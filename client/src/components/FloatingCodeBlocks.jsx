import { motion } from 'framer-motion';

const codeSnippets = [
  {
    code: 'const analyze = async (code) => {\n  return ai.review(code);\n};',
    top: '15%',
    left: '5%',
    delay: 0,
  },
  {
    code: 'if (bug.detected) {\n  fix.suggest();\n}',
    top: '25%',
    right: '8%',
    delay: 0.5,
  },
  {
    code: 'function optimize() {\n  return perf.boost();\n}',
    top: '55%',
    left: '10%',
    delay: 1,
  },
  {
    code: 'class CodeLens {\n  review() {}\n}',
    top: '60%',
    right: '5%',
    delay: 1.5,
  },
];

export default function FloatingCodeBlocks() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute max-w-[220px] rounded-xl border border-violet-500/20 bg-black/40 p-4 font-mono text-xs text-emerald-400/80 backdrop-blur-md"
          style={{
            top: snippet.top,
            left: snippet.left,
            right: snippet.right,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: snippet.delay,
            ease: 'easeInOut',
          }}
        >
          <pre className="whitespace-pre-wrap">{snippet.code}</pre>
        </motion.div>
      ))}
    </div>
  );
}
