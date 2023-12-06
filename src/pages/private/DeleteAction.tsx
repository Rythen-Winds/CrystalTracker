import { redirect } from 'react-router-dom';
import { deleteCrystalById } from '../../DB/supabase';

export async function DeleteAction({ params }: any) {
  await deleteCrystalById(params.crystalId);

  return redirect('/');
}
