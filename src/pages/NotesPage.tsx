import { Layout } from '../components/layout';
import { useDevotional } from '../hooks/useDevotional';
import { NotesEditor } from '../components/features/NotesEditor/NotesEditor';

export function NotesPage() {
  const { devotional } = useDevotional();

  return (
    <Layout>
      <div className="pb-20">
        <h1 className="text-2xl font-bold mb-6">Minhas Anotações</h1>
        {devotional && (
          <NotesEditor 
            devotionalDay={devotional.day} 
            devotionalTitle={devotional.title}
            showList={true}
            showEditor={false}
          />
        )}
      </div>
    </Layout>
  );
}