interface ShareOptions {
  title: string;
  date: string;
}

export function useShareDevotional() {
  const shareDevotional = async ({ title, date }: ShareOptions) => {
    const text = `🙏 *Café com Fé* ☕️\n\n*${title}*\n\n📖 Reflexão do dia: ${date}\n\n✨ Acesse agora e fortaleça sua fé:\n${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Café com Fé',
          text,
          url: window.location.href
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para WhatsApp
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return { shareDevotional };
}