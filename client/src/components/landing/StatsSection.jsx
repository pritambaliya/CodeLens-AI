import { motion } from "framer-motion";
import {
  HiOutlineCodeBracketSquare,
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
} from "react-icons/hi2";

const stats = [
  {
    icon: HiOutlineCodeBracketSquare,
    value: "20+",
    label: "Languages Supported",
    description: "Analyze code across multiple programming languages.",
  },
  {
    icon: HiOutlineCpuChip,
    value: "AI",
    label: "Intelligent Analysis",
    description: "Detect bugs, security issues, and performance improvements.",
  },
  {
    icon: HiOutlineBolt,
    value: "<3s",
    label: "Average Response",
    description: "Receive AI-powered code reviews in just a few seconds.",
  },
  {
    icon: HiOutlineShieldCheck,
    value: "24/7",
    label: "Always Available",
    description: "Review your code anytime with cloud-powered AI.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Platform Highlights
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white lg:text-5xl">
            Built for Modern Developers
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
            CodeLens combines AI-powered code analysis with a modern developer
            experience, helping you write cleaner, faster, and more secure code.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10">
                  <Icon className="text-3xl text-violet-400 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="mt-6 text-4xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-lg font-semibold text-white">
                  {item.label}
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}