import React from 'react';
import { Button as AntdButton } from 'antd';
import { cn } from '@/src/lib/utils';
import { ButtonProps } from '@/src/types/component-types/custom-antd.types';

export const ButtonX = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled,
  type = 'button',
  color,
  ...props
}, ref) => {
  
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-500! text-white shadow-lg shadow-indigo-600/20 border border-indigo-400/20",
    glass: "glass hover:bg-white/10! text-white/90 border-white/5",
    ghost: "bg-transparent hover:bg-white/5! text-white/50 hover:text-white!",
    danger: "bg-red-500/10 hover:bg-red-500/20! text-red-400 border border-red-500/20",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-xl",
    md: "h-11 px-6 text-sm rounded-2xl",
    lg: "h-14 px-8 text-base rounded-[1.5rem]",
  };

  return (
    <AntdButton
      ref={ref}
      loading={isLoading}
      disabled={disabled}
      type="text"
      htmlType={type}
      className={cn(
        "font-bold flex items-center justify-center gap-2 border-0 transform active:scale-[0.98] transition-all duration-100 ease-out select-none",
        variantStyles[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {!isLoading && (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span className="flex items-center justify-center gap-1">{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
      {isLoading && <span className="flex items-center justify-center gap-1">{children}</span>}
    </AntdButton>
  );
});

ButtonX.displayName = 'ButtonX';