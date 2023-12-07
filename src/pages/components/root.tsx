import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { Database } from '../../DB/supabaseTypes';
import { getCrystals } from '../../DB/supabase';

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const { crystals } = await getCrystals(q);
  return crystals;
}

export default function Root() {
  const navigate = useNavigate();
  const data =
    useLoaderData() as Database['public']['Tables']['Crystal']['Row'][];

  return (
    <div
      id='wrapper'
      className='grid h-screen grid-cols-[20rem,auto]'
    >
      <div
        id='sidebar'
        className='bg-primary w-80 border-r border-accent flex flex-col'
      >
        <span
          id='logo-container'
          className=' '
        >
          <h1
            onClick={() => navigate('/')}
            className='bg-secondary text-xl px-8 py-2 cursor-pointer hover:bg-accent text-center'
          >
            Crystal Book
          </h1>
        </span>
        <div className='flex gap-1 w-full px-8 py-2 border-b border-secondary'>
          <Form
            id='search-form'
            role='search'
            className='w-full flex py-2 '
          >
            <input
              id='q'
              aria-label='Search crystals'
              placeholder='Search'
              type='search'
              name='q'
              className='w-full drop-shadow-lg border-accent border bg-secondary text-text placeholder:text-primary'
            />
            <div
              id='search-spinner'
              aria-hidden
              hidden={true}
            />
            <div
              className='sr-only'
              aria-live='polite'
            ></div>
          </Form>
        </div>
        <nav className='overflow-scroll'>
          {data.length ? (
            <ul className='flex flex-col gap-1'>
              {data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((crystal) => (
                  <li
                    key={crystal.id}
                    className='flex px-8'
                  >
                    <Link
                      to={`/crystal/${crystal.id}`}
                      className='px-8 py-2 w-full rounded-lg hover:bg-opacity-80 hover:bg-accent'
                    >
                      {<>{crystal.name}</>} {crystal.favorite && <span>★</span>}
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <p> Error loading data</p>
          )}
        </nav>
      </div>
      <div
        id='detail'
        className='flex-grow flex flex-col relative'
      >
        <Outlet />
      </div>
    </div>
  );
}
