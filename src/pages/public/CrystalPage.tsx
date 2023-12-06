import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../../DB/AuthProvider';
import { Database } from '../../DB/supabaseTypes';
import ActionPanel from '../components/ActionPanel';

export default function CrystalPage() {
  const { isAuthenticated } = useAuth();

  const crystal =
    useLoaderData() as Database['public']['Tables']['Crystal']['Row'];
  return (
    <>
      <h1 className='text-4xl px-8 py-2'>{crystal.name}</h1>
      <p className='px-8 py-2'>{crystal.description}</p>
      <p className='px-8 py-2'>
        <span className='px-8 py-2 italic'>{crystal.visual}</span>
      </p>
      {isAuthenticated && <ActionPanel />}
    </>
  );
}
