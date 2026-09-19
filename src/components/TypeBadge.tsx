import React from 'react';
import { getTypeColor, getTypeSpanish } from '../utils/typeColors';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  size = 'md',
}) => {
  const color = getTypeColor(type);
  const name = getTypeSpanish(type);

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-md text-white shadow-sm capitalize ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  );
};
