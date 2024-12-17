import { Fish } from 'lucide-react';

interface DevotionalProps {
  text: string;
}

export function Devotional({ text }: DevotionalProps) {
  return (
    <div className="bg-[#efefef] dark:bg-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Fish className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Devocional</h2>
      </div>
      <p className="text-justify text-gray-700 dark:text-gray-300">{text}</p>
    </div>
  );
}