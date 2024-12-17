import { useState, useEffect } from 'react';

export function useLogoUrl(isDark: boolean) {
  const [logoUrl, setLogoUrl] = useState(
    isDark 
      ? 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo2.png'
      : 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo1.png'
  );

  useEffect(() => {
    setLogoUrl(
      isDark 
        ? 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo2.png'
        : 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo1.png'
    );
  }, [isDark]);

  return logoUrl;
}