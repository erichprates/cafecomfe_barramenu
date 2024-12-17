import { ReactNode } from 'react';

interface DevotionalCardProps {
  children: ReactNode;
}

export function DevotionalCard({ children }: DevotionalCardProps) {
  return (
    <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {children}
    </div>
  );
}