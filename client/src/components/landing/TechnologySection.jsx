import { motion } from "framer-motion";
import {
  SiReact,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import {
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiSparkles 
} from "react-icons/hi2";

const technologies = [
  {
    name: "React",
    category: "Frontend Framework",
    icon: SiReact,
    color: "text-cyan-400",
  },
  {
    name: "Express.js",
    category: "Backend Framework",
    icon: SiExpress,
    color: "text-gray-300",
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: SiMongodb,
    color: "text-green-400",
  },
  {
    name: "JWT",
    category: "Authentication",
    icon: HiOutlineShieldCheck,
    color: "text-yellow-400",
  },
  {
    name: "OpenAI",
    category: "AI Engine",
    icon: HiSparkles,
    color: "text-violet-400",
  },
  {
    name: "Monaco Editor",
    category: "Code Editor",
    icon: HiOutlineCodeBracket,
    color: "text-blue-400",
  },
  {
    name: "REST API",
    category: "API Architecture",
    icon: HiOutlineServerStack,
    color: "text-orange-400",
  },
  {
    name: "Tailwind CSS",
    category: "UI Framework",
    icon: SiTailwindcss,
    color: "text-sky-400",
  },
];

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-violet-400 font-semibold uppercase tracking-[0.25em]">
            Tech Stack
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
            Powered by Modern Technologies
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Every code review is backed by a carefully selected technology
            stack focused on performance, scalability, security, and an
            exceptional developer experience.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_35px_rgba(139,92,246,0.2)]"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Icon
                    className={`text-3xl ${tech.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-white">
                  {tech.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {tech.category}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}