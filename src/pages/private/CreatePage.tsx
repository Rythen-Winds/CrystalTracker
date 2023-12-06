import { Form, redirect, useNavigate } from 'react-router-dom';
import { createCrystal } from '../../DB/supabase';
import { Database } from '../../DB/supabaseTypes';

export async function action({ request }: any) {
  const formData = await request.formData();

  const user = formData.get('user') as string;
  console.log(user);

  const name: string = formData.get('name') as string;
  const description: string = formData.get('description') as string;
  const visual: string = formData.get('visual') as string;

  const newCrystal: Database['public']['Tables']['Crystal']['Insert'] = {
    name,
    description,
    visual,
  };

  // Use await when calling createCrystal, assuming it returns a promise
  const data = await createCrystal(newCrystal);
  return redirect(`/crystal/${data.id}`);
}

const CreatePage = () => {
  const navigate = useNavigate();
  return (
    <Form
      id='crystal-form'
      method='post'
      className='px-8 py-2 flex flex-col gap-4 justify-center items-center container '
    >
      <label>Name</label>

      <input
        placeholder='Crystal Name'
        aria-label='Crystal name'
        type='text'
        name='name'
        spellCheck='true'
        className='bg-secondary placeholder:text-primary w-full px-4 py-2'
      />
      <textarea
        placeholder='Description'
        aria-label='Description'
        name='description'
        spellCheck='true'
        className='bg-secondary placeholder:text-primary w-full px-4 py-2'
      />
      <textarea
        aria-label='Visuals'
        name='visual'
        placeholder='Visual Attributes'
        spellCheck='true'
        className='bg-secondary placeholder:text-primary w-full px-4 py-2'
      />
      <div className='flex justify-around max-w-xs w-full px-4 py-2'>
        <button type='submit'>Submit</button>
        <button
          type='button'
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};
export default CreatePage;
