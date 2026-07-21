import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface ModalProps extends Omit<AntdModalProps, 'open' | 'onCancel' | 'width'> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const ModalX: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
  ...props
}) => {
  // Width mapping according to size props
  const widths: Record<string, string | number> = {
    sm: 448, // max-w-md
    md: 512, // max-w-lg
    lg: 672, // max-w-2xl
    xl: 896, // max-w-4xl
    full: '95vw',
  };

  return (
    <AntdModal
      open={isOpen}
      onCancel={onClose}
      footer={null} // Remove default Antd footer buttons
      centered
      width={widths[size]}
      closeIcon={<X className="w-5 h-5 text-white/30 hover:text-white transition-colors" />}
      modalRender={(modal) => (
        <div className="relative overflow-hidden rounded-[3rem]">
          {modal}
          {/* Decorative background ambient glow */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
        </div>
      )}
      className={cn(
        // Override Antd dialog containers with Glassmorphism
        "[&_.ant-modal-content]:glass [&_.ant-modal-content]:!p-8 [&_.ant-modal-content]:border [&_.ant-modal-content]:border-white/10 [&_.ant-modal-content]:!rounded-[3rem] [&_.ant-modal-content]:shadow-2xl",
        "[&_.ant-modal-header]:!bg-transparent [&_.ant-modal-header]:!border-none [&_.ant-modal-header]:!mb-8",
        "[&_.ant-modal-title]:text-2xl [&_.ant-modal-title]:font-black [&_.ant-modal-title]:tracking-tighter [&_.ant-modal-title]:!text-white/90",
        "[&_.ant-modal-close]:top-8 [&_.ant-modal-close]:right-8",
        size === 'full' && "[&_.ant-modal-content]:h-[90vh] [&_.ant-modal-content]:flex [&_.ant-modal-content]:flex-col",
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[70vh]">
        {children}
      </div>
    </AntdModal>
  );
};

ModalX.displayName = 'ModalX';