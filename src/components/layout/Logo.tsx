import { useTheme } from '../../contexts/ThemeContext';
import { useLogoUrl } from '../../hooks/useLogoUrl';

export function Logo() {
  const { isDark } = useTheme();
  const logoUrl = useLogoUrl(isDark);

  return (
    <div className="flex justify-center mb-8">
      <img 
        src={logoUrl} 
        alt="Café com Fé" 
        className="h-20 w-auto transition-all duration-300 ease-in-out"
      />
    </div>
  );
}