import { createClient } from '@supabase/supabase-js';
import { Database } from './supabaseTypes';

export const supabase = createClient<Database>(
  'https://ojarwjvijxbmxebhnevg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qYXJ3anZpanhibXhlYmhuZXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MjAwOTAsImV4cCI6MjAxNzA5NjA5MH0.lVRVJzGMPY3KLvsAAC0eJPxGg-9CmAd6iosW0VHUrMI'
);

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return !!data;
  } catch (error) {
    // Handle the error if needed
    console.error('Login error:', error);
    throw error; // You might want to throw the error again or handle it accordingly
  }
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getCrystals(filter: string | null) {
  let query = supabase.from('Crystal').select('*');
  //

  if (!!filter) {
    query = query.ilike('name', `%${filter}%`);
  }
  const { data, error } = await query;

  if (error) {
    throw error;
  } else {
    return { crystals: data };
  }
}

export async function getCrystalById(id: number): Promise<{
  created_at: string;
  description: string | null;
  favorite: boolean;
  id: number;
  name: string;
  visual: string | null;
}> {
  const { data, error } = await supabase
    .from('Crystal')
    .select('*')
    .eq('id', id);
  if (error) throw error;
  return data![0];
}

export async function createCrystal(
  crystal: Database['public']['Tables']['Crystal']['Insert']
): Promise<Database['public']['Tables']['Crystal']['Row']> {
  console.log(crystal);
  const { data, error } = await supabase
    .from('Crystal')
    .insert(crystal)
    .select();
  if (error) throw error;
  return data![0];
}
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session;
}
export async function editCrystal(
  crystal: Database['public']['Tables']['Crystal']['Row']
) {
  const { data, error } = await supabase
    .from('Crystal')
    .update(crystal)
    .eq('id', crystal.id)
    .select();
  if (error) {
    throw error;
  }
  return data![0];
}

export async function deleteCrystalById(id: number) {
  const { error } = await supabase.from('Crystal').delete().eq('id', id);
  if (error) {
    throw error;
  }
}
supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'USER_UPDATED') {
    console.log('USER_UPDATED', session);
  } else console.log(event);
  getSession();
});
