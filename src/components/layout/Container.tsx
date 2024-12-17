import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-6 pb-24">
        {children}
      </div>
    </div>
  );
}