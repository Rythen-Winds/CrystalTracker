import { Form } from 'react-router-dom';

const ActionPanel = () => {
  return (
    <div
      id='actionPanel'
      className='absolute bottom-8 left-0 right-0 flex justify-between px-8 py-8'
    >
      <Form action='edit'>
        <button
          type='submit'
          className='bg-accent hover:bg-sky-400'
        >
          Edit
        </button>
      </Form>
      <Form
        method='post'
        action='delete'
        onSubmit={(event) => {
          if (!confirm('Please confirm you want to delete this record.')) {
            event.preventDefault();
          }
        }}
      >
        <button
          className='bg-accent hover:bg-sky-400 active:bg-black'
          type='submit'
        >
          Delete
        </button>
      </Form>
    </div>
  );
};

export default ActionPanel;
