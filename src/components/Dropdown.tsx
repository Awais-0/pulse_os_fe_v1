import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DropdownOption {
    label: string;
    value: any;
    icon?: React.ElementType;
}

interface DropdownProps {
    options: DropdownOption[];
    value?: any;
    onChange: (value: any) => void;
    placeholder?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select option...',
    className,
    size = 'md',
    label,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const updateCoords = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updateCoords();
            window.addEventListener('resize', updateCoords);
            window.addEventListener('scroll', updateCoords);
        }
        return () => {
            window.removeEventListener('resize', updateCoords);
            window.removeEventListener('scroll', updateCoords);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sizes = {
        sm: {
            button: "px-3 py-2 text-[10px] rounded-xl",
            list: "mt-1 rounded-xl p-1",
            item: "px-2 py-1.5 text-[10px] rounded-lg gap-2",
            icon: "w-3 h-3"
        },
        md: {
            button: "px-5 py-3 text-sm rounded-2xl",
            list: "mt-2 rounded-2xl p-1.5",
            item: "px-3 py-2 text-sm rounded-xl gap-3",
            icon: "w-4 h-4"
        },
        lg: {
            button: "px-6 py-4 text-base rounded-[1.5rem]",
            list: "mt-2 rounded-[1.5rem] p-2",
            item: "px-4 py-3 text-base rounded-2xl gap-4",
            icon: "w-5 h-5"
        }
    };

    const dropdownList = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "circOut" }}
                    style={{
                        position: 'absolute',
                        top: coords.top,
                        left: coords.left,
                        width: coords.width,
                    }}
                    className={cn(
                        "z-[9999] glass border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden",
                        sizes[size].list
                    )}
                >
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center transition-all font-bold",
                                    value === option.value
                                        ? "bg-indigo-500 text-white"
                                        : "text-white/40 hover:bg-white/5 hover:text-white",
                                    sizes[size].item
                                )}
                            >
                                {option.icon && (
                                    <option.icon className={cn(
                                        value === option.value ? "text-white" : "text-indigo-400",
                                        sizes[size].icon
                                    )} />
                                )}
                                <span className="flex-1 text-left truncate">{option.label}</span>
                                {value === option.value && (
                                    <Check className={sizes[size].icon} />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className={cn("relative w-full", className)} ref={dropdownRef}>
            {label && (
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1 mb-2 block">
                    {label}
                </label>
            )}

            <button
                ref={buttonRef}
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between font-bold transition-all outline-none",
                    "glass border border-white/5 hover:border-white/10",
                    isOpen && "border-indigo-500/30 ring-4 ring-indigo-500/5",
                    disabled && "opacity-50 cursor-not-allowed",
                    sizes[size].button
                )}
            >
                <div className="flex items-center gap-3 truncate">
                    {selectedOption?.icon && (
                        <selectedOption.icon className={cn("text-indigo-400", sizes[size].icon)} />
                    )}
                    <span className={cn(
                        "truncate",
                        !selectedOption ? "text-white/20" : "text-white/90"
                    )}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown className={cn(
                    "text-white/20 transition-transform duration-300",
                    isOpen && "rotate-180 text-indigo-400",
                    sizes[size].icon
                )} />
            </button>

            {createPortal(dropdownList, document.body)}
        </div>
    );
};
