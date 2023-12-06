import { redirect, useNavigate } from 'react-router-dom';
import { logout } from '../../DB/supabase';

const UserHomePage = () => {
  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await logout()
    return redirect('/');
  };
  const navigate = useNavigate();
  return (
    <div id='home-page' className='flex h-full justify-center items-center gap-4'>
      <button
        type='button'
        onClick={() => navigate('/new')}
      >
        New
      </button>
      <button
        onClick={(e) => handleClick(e)}
        type='button'
      >
        Logout
      </button>
    </div>
  );
};

export default UserHomePage;
