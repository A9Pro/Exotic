// src/components/PageTransition.jsx
import { motion } from 'framer-motion';

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smoother feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide transition (for cart/checkout)
export function SlideTransition({ children, direction = 'right', className = '' }) {
  const directions = {
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
    up: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
    down: { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
  };

  return (
    <motion.div
      {...directions[direction]}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade + Scale transition (for modals/popups)
export function ScaleTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger children (for lists)
export function StaggerContainer({ children, className = '', staggerDelay = 0.05 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}