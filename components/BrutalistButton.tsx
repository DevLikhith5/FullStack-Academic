
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface BrutalistButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  active?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  active = false,
  ...props
}) => {
  // Removed disabled:opacity-50 from base styles to handle it conditionally
  const baseStyles = "font-bold uppercase border-4 border-black flex items-center justify-center disabled:cursor-not-allowed relative transition-colors duration-200";

  const variants = {
    primary: "bg-black text-white shadow-hard",
    secondary: "bg-white text-black shadow-hard",
    accent: "bg-brut-cyan text-black shadow-hard",
    danger: "bg-brut-red text-white shadow-hard",
    success: "bg-brut-green text-black shadow-hard",
    outline: "bg-transparent text-black border-black",
  };

  // Override for specific active states in quiz (e.g., selected answer)
  const activeStyles = active ? "bg-black text-white" : "";

  // Logic: Only dim the button if it's disabled AND it's NOT a result state (success/danger)
  // This ensures the green/red feedback is always vibrant/visible.
  const opacityClass = disabled && !['success', 'danger'].includes(variant) ? 'opacity-50' : 'opacity-100';

  const sizes = {
    sm: "text-sm py-2 px-4",
    md: "text-base py-3 px-6",
    lg: "text-lg lg:text-xl py-4 px-8 lg:py-5 lg:px-10",
    xl: "text-xl md:text-2xl lg:text-3xl py-6 px-10 lg:py-8 lg:px-12",
  };

  // Framer Motion variants for hover states
  const buttonVariants = {
    hover: {
      x: -2,
      y: -2,
      boxShadow: "6px 6px 0px 0px #000000",
      // We only want to animate colors on hover if it's NOT disabled
      // But since whileHover is conditionally applied, this logic is safe-guarded
      backgroundColor: variant === 'primary' ? '#FFFFFF' : variant === 'outline' ? '#000000' : undefined,
      color: variant === 'primary' ? '#000000' : variant === 'outline' ? '#FFFFFF' : undefined,
    },
    tap: {
      x: 4,
      y: 4,
      boxShadow: "0px 0px 0px 0px #000000",
    }
  };

  const staticClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${activeStyles}
    ${opacityClass}
    ${className}
  `;

  return (
    <motion.button
      className={staticClassName}
      disabled={disabled}
      variants={buttonVariants}
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default BrutalistButton;
