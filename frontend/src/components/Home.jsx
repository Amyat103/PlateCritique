import { useEffect } from 'react';
import PictureBox from './PictureBox';
import { usePictureContext } from './hooks/usePictureContext';

function Home() {
  // const [picture, setPicture] = useState(null);
  const { picture, dispatch } = usePictureContext();

  useEffect(() => {
    async function fetchPicture() {
      // try {
      const response = await fetch('http://localhost:4000/');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POST', payload: json });
      }
      // } catch (err) {
      //   console.log('Fetch error', err);
      // }
    }

    fetchPicture();
  }, [dispatch]);

  return (
    <div className='container mt-4'>
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {picture &&
          picture.map((each) => (
            <div className='col' key={each._id}>
              <PictureBox picture={each} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
