import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
};

const Card = ({
  children,
  className = '',
  hoverable = false,
  bordered = true,
  shadow = 'md',
}: CardProps) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  const hoverableClass = hoverable ? 'transform transition-transform hover:-translate-y-1 hover:shadow-lg' : '';
  const borderedClass = bordered ? 'border border-gray-200 dark:border-dark-300' : '';

  return (
    <div 
      className={`bg-white dark:bg-dark-200 rounded-lg ${borderedClass} ${shadowClasses[shadow]} ${hoverableClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;