import React from 'react';
import { Select, SelectProps } from 'antd';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface DropdownOption {
  label: string;
  value: any;
  icon?: React.ElementType;
}

export interface DropdownProps extends Omit<SelectProps, 'options' | 'onChange' | 'size'> {
  options: DropdownOption[];
  value?: any;
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  disabled?: boolean;
}

export const DropdownX: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  className,
  size = 'md',
  label,
  disabled = false,
  ...props
}) => {
  // Map size prop to Ant Design sizes & Tailwind padding
  const sizeMap = {
    sm: { antdSize: 'small' as const, style: 'h-8 text-[10px] rounded-xl' },
    md: { antdSize: 'middle' as const, style: 'h-11 text-sm rounded-2xl' },
    lg: { antdSize: 'large' as const, style: 'h-14 text-base rounded-[1.5rem]' },
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">
          {label}
        </label>
      )}

      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        size={sizeMap[size].antdSize}
        suffixIcon={<ChevronDown className={cn("text-white/20 transition-transform duration-300", iconSizes[size])} />}
        popupClassName="glass border border-white/10 rounded-2xl p-1 shadow-2xl backdrop-blur-xl [&_.ant-select-item-option]:rounded-xl [&_.ant-select-item-option-selected]:bg-indigo-500 [&_.ant-select-item-option-selected]:text-white"
        className={cn(
          "w-full glass border border-white/5 hover:border-white/10 transition-all",
          "[&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!border-none [&_.ant-select-selection-item]:text-white/90 [&_.ant-select-selection-placeholder]:text-white/20",
          sizeMap[size].style
        )}
        menuItemSelectedIcon={<Check className={iconSizes[size]} />}
        options={options.map((opt) => ({
          value: opt.value,
          label: (
            <div className="flex items-center gap-2.5 font-bold">
              {opt.icon && <opt.icon className={cn("text-indigo-400", iconSizes[size])} />}
              <span className="truncate">{opt.label}</span>
            </div>
          ),
        }))}
        {...props}
      />
    </div>
  );
};

DropdownX.displayName = 'DropdownX';