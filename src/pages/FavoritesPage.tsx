import { Layout } from '../components/layout';
import { useFavorites } from '../hooks/useFavorites';
import { LoadingSpinner } from '../components/loading/LoadingSpinner';
import { formatDate } from '../utils/formatters';

export function FavoritesPage() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <div className="mb-20">
        <h1 className="text-2xl font-bold mb-6">Meus Favoritos</h1>
        <div className="space-y-4">
          {favorites.map((devotional) => (
            <div 
              key={devotional.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {formatDate(devotional.created_at)}
              </div>
              <h2 className="text-xl font-semibold mb-2">{devotional.title}</h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="font-medium">{devotional.verse_reference}</span>
                <span>•</span>
                <span>{devotional.verse_text}</span>
              </div>
            </div>
          ))}
          
          {favorites.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Você ainda não tem devocionais favoritos
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}