import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      id='home-page'
      className='flex h-full justify-center items-center'
    >
      <button
        onClick={() => navigate('CrystalTracker/login')}
        type='button'
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
