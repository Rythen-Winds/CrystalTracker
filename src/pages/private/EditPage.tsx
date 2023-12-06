import React, { useReducer } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { editCrystal } from '../../DB/supabase';
import { Database } from '../../DB/supabaseTypes';

// Define action types for the form reducer
type FormAction = { type: 'UPDATE_FIELD'; field: string; value: string };

// Define the state of the form
interface FormState {
  name: string;
  description: string;
  visual: string;
}

// Initial state for the form
const initialFormState: FormState = {
  name: '',
  description: '',
  visual: '',
};

// Form reducer function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };

    default:
      return state;
  }
};

const EditPage = () => {
  const crystal =
    useLoaderData() as Database['public']['Tables']['Crystal']['Row'];
  const navigate = useNavigate();

  // Initialize the form state using the form reducer
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Access formState to get the form data
    const formData = formState;
    const updatedCrystal = {
      ...crystal,
      name: formData.name !== '' ? formData.name : crystal.name,
      description:
        formData.description !== ''
          ? formData.description
          : crystal.description,
      visual: formData.visual !== '' ? formData.visual : crystal.visual,
    };

    const response = await editCrystal(updatedCrystal);
    navigate(`/crystal/${response.id}`);
    // Perform form submission logic (e.g., send data to server)

    // After successful submission, you might want to reset the form
  };

  // Function to update form fields in the form state
  const handleFieldChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  return (
    <form
      id='edit-form'
      className='flex flex-col gap-4 px-8 py-2'
    >
      <label htmlFor='name'>{crystal.name}</label>
      <label htmlFor='description'>{crystal.description}</label>
      <label htmlFor='text'>{crystal.visual}</label>
      <input
        aria-label='Crystal name'
        type='text'
        name='name'
        spellCheck={true}
        value={formState.name || crystal.name}
        onChange={(e) => handleFieldChange('name', e.target.value)}
        className='bg-secondary px-4 py-2'
      />
      <textarea
        placeholder={crystal.description || 'Description'}
        aria-label='Description'
        name='description'
        spellCheck={true}
        value={formState.description || crystal.description || ''}
        onChange={(e) => handleFieldChange('description', e.target.value)}
        rows={4}
        className='bg-secondary px-4 py-2'
      />

      <input
        type='text'
        name='visual'
        placeholder={crystal.visual || 'visual description'}
        spellCheck={true}
        value={formState.visual || crystal.visual || ''}
        onChange={(e) => handleFieldChange('visual', e.target.value)}
        className='bg-secondary px-4 py-2'
      />

      <div className='flex w-full justify-around'>
        <button
          type='button'
          onClick={(e) => handleFormSubmit(e)}
          className='bg-accent text-text'
        >
          Submit
        </button>
        <button
          type='button'
          onClick={() => {
            navigate(-1);
          }}
          className='bg-primary text-secondary'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPage;
