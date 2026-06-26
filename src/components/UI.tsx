import React from 'react';
import { motion } from 'motion/react';

export const Card = ({ children, onClick, className = "", shadow = "dark" }: { children: React.ReactNode, onClick?: () => void, className?: string, key?: string | number, shadow?: "primary" | "success" | "danger" | "secondary" | "dark" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`bg-white rounded-3xl p-6 border-4 border-black/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer hover:border-black/20 ${className} hard-shadow-${shadow}`}
  >
    {children}
  </motion.div>
);

export const Button = ({ children, onClick, variant = 'primary', icon: Icon, className = "" }: any) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-dark',
    accent: 'bg-success text-white',
    dark: 'bg-dark text-white rounded-2xl'
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-2xl font-black uppercase tracking-tight flex items-center justify-center gap-3 button-pop ${variants[variant as keyof typeof variants] || variants.primary} ${className}`}
    >
      {Icon && <Icon size={20} strokeWidth={3} />}
      {children}
    </motion.button>
  );
};
