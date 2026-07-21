import React, { forwardRef } from 'react';
import { Card, CardProps } from 'antd';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export interface BentoCardProps extends CardProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

export const CardX = forwardRef<HTMLDivElement, BentoCardProps>(({ 
  children, 
  className, 
  delay = 0,
  style,
  bordered = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={cn("h-full w-full", className)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        className="h-full w-full group cursor-grab active:cursor-grabbing"
      >
        <Card
          bordered={bordered}
          className="bento-item h-full w-full flex flex-col [&>.ant-card-body]:h-full [&>.ant-card-body]:flex-1"
          {...props}
        >
          {children}
        </Card>
      </motion.div>
    </div>
  );
});

CardX.displayName = 'CardX';