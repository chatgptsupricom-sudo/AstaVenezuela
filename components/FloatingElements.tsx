'use client';

import { motion } from 'framer-motion';

export function FloatingElements() {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Circle 1 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-brand/20 to-brand-strong/10 blur-3xl"
        style={{ top: '10%', right: '-100px' }}
        variants={floatingVariants}
        animate="animate"
      />

      {/* Floating Circle 2 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-brand-strong/15 to-brand/5 blur-3xl"
        style={{ bottom: '10%', left: '-100px' }}
        variants={floatingVariants}
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 1,
        }}
      />

      {/* Floating Circle 3 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-brand/10 to-transparent blur-3xl"
        style={{ top: '50%', left: '10%' }}
        variants={floatingVariants}
        animate="animate"
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2,
        }}
      />
    </div>
  );
}
