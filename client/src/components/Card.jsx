import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
  ...props
}) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={`glass-card rounded-2xl p-6 text-left ${glow ? 'glow-purple' : ''} ${onClick ? 'cursor-pointer w-full' : ''} ${className}`}
      whileHover={hover ? { y: -4, borderColor: 'rgba(139, 92, 246, 0.3)' } : undefined}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
