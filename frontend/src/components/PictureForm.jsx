import { useState, useEffect } from 'react';
import { usePictureContext } from './hooks/usePictureContext';
import { useParams } from 'react-router-dom';
import './PictureForm.css';

function PictureForm() {
  const { dispatch } = usePictureContext();
  const [title, setTitle] = useState('');
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:4000/${id}`);
        const data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setFoodType(data.foodType);
          setDescription(data.description);
          setPicture(data.picture);
        }
      };
      fetchData();
    }
  }, [id]);

  async function handlePost(e) {
    e.preventDefault();
    setSubmitted(true);

    if (e.target.checkValidity()) {
      const post = { title, foodType, description, picture };
      const endpoint = id
        ? `http://localhost:4000/${id}`
        : 'http://localhost:4000/';
      const method = id ? 'PATCH' : 'POST';

      try {
        const response = await fetch(endpoint, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        const json = await response.json();

        if (!response.ok) {
          console.error(json.error);
        } else {
          if (!id) {
            setTitle('');
            setFoodType('');
            setDescription('');
            setPicture('');
          }
          setSubmitted(false);
          dispatch({ type: id ? 'UPDATE_POST' : 'CREATE_POST', payload: json });
        }
      } catch (error) {
        console.error('Could not post:', error);
      }
    }
  }

  return (
    <>
      <form
        className='post-picture needs-validation'
        onSubmit={handlePost}
        noValidate
      >
        <h2>{id ? 'Update Post' : 'Upload A Post'}</h2>

        <div className='col-md-12 mb-3'>
          <label htmlFor='validationCustom01'>Post Title:</label>
          <input
            type='text'
            className={`form-control mb-3 ${
              submitted
                ? title.length >= 3 && title.length <= 100
                  ? 'is-valid'
                  : 'is-invalid'
                : ''
            }`}
            id='validationCustom01'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={100}
          />
          <div className='valid-feedback'>Looks good!</div>
          <div className='invalid-feedback'>
            Please enter a valid title (3-100 characters).
          </div>
        </div>

        <div className='col-md-12 mb-3'>
          <label htmlFor='foodType'>Food Type:</label>
          <div className='btn-group d-flex' role='group' aria-label='Food Type'>
            {['Snack', 'Breakfast', 'Brunch', 'Dinner', 'Lunch'].map((type) => (
              <div key={type} className='btn-container'>
                <input
                  type='radio'
                  className='btn-check'
                  name='foodType'
                  id={type}
                  value={type}
                  autoComplete='off'
                  checked={foodType === type}
                  onChange={(e) => setFoodType(e.target.value)}
                  required
                />
                <label className='btn btn-outline-danger' htmlFor={type}>
                  {type}
                </label>
              </div>
            ))}
          </div>
          <div className='invalid-feedback'>
            Please select a valid food type.
          </div>
        </div>

        <div className='col-md-12'>
          <label htmlFor='validationDescription'>Description:</label>
          <input
            type='text'
            className={`form-control mb-3 ${
              submitted
                ? description.length === 0 ||
                  (description.length >= 5 && description.length <= 300)
                  ? 'is-valid'
                  : 'is-invalid'
                : ''
            }`}
            id='validationDescription'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
            minLength={5}
          />
          <div className='valid-feedback'>Looks good!</div>
          <div className='invalid-feedback'>
            Please enter a description (5-300 characters) or leave it empty.
          </div>
        </div>

        <div className='col-md-12'>
          <label htmlFor='validationPicture'>Picture URL:</label>
          <input
            type='text'
            className={`form-control mb-3 ${
              submitted ? (picture.length > 0 ? 'is-valid' : 'is-invalid') : ''
            }`}
            id='validationPicture'
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            required
          />
          <div className='valid-feedback'>Looks good!</div>
          <div className='invalid-feedback'>Please provide a picture URL.</div>
        </div>

        <button type='submit' className='btn btn-primary'>
          POST!
        </button>
      </form>
    </>
  );
}

export default PictureForm;
