import React, { forwardRef } from 'react';
import { Input, InputRef, InputProps } from 'antd';
import { Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface SearchBarProps extends InputProps {
  containerClassName?: string;
}

export const SearchBarX = forwardRef<InputRef, SearchBarProps>(({
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <Input
      ref={ref}
      prefix={<Search className="w-4 h-4 text-white/30 mr-1" />}
      className={cn(
        // Antd Input container styling override with glass effect
        "glass rounded-2xl border-none text-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all px-4 py-2",
        // Antd internal element overrides for seamless glassmorphism
        "[&_.ant-input]:bg-transparent [&_.ant-input]:text-white [&_.ant-input]:placeholder:text-white/20 [&_.ant-input]:text-sm",
        containerClassName,
        className
      )}
      {...props}
    />
  );
});

SearchBarX.displayName = 'SearchBarX';