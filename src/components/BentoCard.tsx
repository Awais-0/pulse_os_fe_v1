import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(({ 
  children, 
  className, 
  delay = 0,
  style,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={cn("h-full", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        className="bento-item h-full w-full group cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  );
});

BentoCard.displayName = 'BentoCard';
