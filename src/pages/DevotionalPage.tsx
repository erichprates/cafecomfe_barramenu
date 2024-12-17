import { Layout } from '../components/layout';
import { DevotionalContainer } from '../components/devotional/DevotionalContainer';
import { LoadingSpinner } from '../components/loading/LoadingSpinner';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { useDevotional } from '../hooks/useDevotional';
import { formatDate } from '../utils/formatters';
import { NotesEditor } from '../components/features/NotesEditor/NotesEditor';
import { DevotionalCard } from '../components/cards/DevotionalCard';

export function DevotionalPage() {
  const { devotional, isLoading, error } = useDevotional();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!devotional) {
    return <ErrorMessage message="Devocional não encontrado" />;
  }

  const today = formatDate(new Date().toISOString());

  return (
    <Layout>
      <div className="pb-20">
        <DevotionalContainer devotional={devotional} today={today} />
        
        <div className="mt-6">
          <DevotionalCard>
            <NotesEditor 
              devotionalDay={devotional.day} 
              devotionalTitle={devotional.title}
              showList={false}
            />
          </DevotionalCard>
        </div>
      </div>
    </Layout>
  );
}