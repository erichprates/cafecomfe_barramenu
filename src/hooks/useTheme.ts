import { useEffect, useState } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    window.location.reload(); // Força o refresh da página ao mudar o tema
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
}