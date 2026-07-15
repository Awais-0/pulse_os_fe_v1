import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(({
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <div className={cn(
      "glass px-4 py-2 rounded-2xl flex items-center gap-2 text-white/60 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all",
      containerClassName
    )}>
      <Search className="w-4 h-4 text-white/30" />
      <input
        ref={ref}
        type="text"
        className={cn(
          "bg-transparent border-none outline-none text-sm placeholder:text-white/20 w-full",
          className
        )}
        {...props}
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
