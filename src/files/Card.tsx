import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <div
      className={`
        bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50
        ${hover ? 'hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
