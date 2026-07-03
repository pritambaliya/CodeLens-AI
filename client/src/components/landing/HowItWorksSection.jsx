import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Upload Your Code',
    description: 'Paste your code directly or upload supported files (.js, .cpp, .java, .py) through our intuitive editor.',
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Our AI engine analyzes your code for bugs, performance issues, security vulnerabilities, and complexity.',
  },
  {
    step: '03',
    title: 'Review Results',
    description: 'Get a detailed breakdown with actionable suggestions, severity ratings, and improvement recommendations.',
  },
  {
    step: '04',
    title: 'Apply & Improve',
    description: 'Use the insights to refactor your code, fix bugs, and continuously improve code quality over time.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-400">How It Works</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            From code to insights in minutes
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/50 via-blue-500/50 to-transparent lg:left-1/2 lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col gap-6 lg:flex-row lg:items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="glass-card inline-block rounded-2xl p-6 lg:max-w-md">
                    <span className="text-3xl font-bold gradient-text">{step.step}</span>
                    <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                  </div>
                </div>

                <div className="relative hidden lg:flex lg:w-16 lg:justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-violet-500 bg-background shadow-lg shadow-violet-500/30">
                    <div className="h-3 w-3 rounded-full bg-violet-500" />
                  </div>
                </div>

                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
