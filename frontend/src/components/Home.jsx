import { useEffect, useState } from 'react';

function Home() {
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    async function fetchPicture() {
      try {
        const response = await fetch('http://localhost:4000/');
        const json = await response.json();

        if (!response.ok) {
          console.log(response.error);
        }
        setPicture(json);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPicture();
  }, []);

  return (
    <div className='container'>
      <div className='pictures'>
        <h2>Home</h2>
        {picture && picture.map((each) => <p key={each._id}>{each.title}</p>)}
      </div>
    </div>
  );
}

export default Home;
