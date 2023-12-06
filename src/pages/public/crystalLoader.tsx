import { getCrystalById } from '../../DB/supabase';

export async function crystalLoader({ params }: any): Promise<{
  created_at: string;
  description: string | null;
  favorite: boolean;
  id: number;
  name: string;
  visual: string | null;
}> {
  const crystal = await getCrystalById(params.crystalId);
  return crystal;
}
