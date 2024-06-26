import { useState, useEffect } from 'react';
import { usePictureContext } from './hooks/usePictureContext';
import { useParams } from 'react-router-dom';
import './PictureForm.css';

function PictureForm() {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const { dispatch } = usePictureContext();
  const [title, setTitle] = useState('');
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setFoodType(data.foodType);
          setDescription(data.description);
          setFile(data.picture);
          setRating(data.rating || 0);
        }
      };
      fetchData();
    }
  }, [API_URL, id]);

  async function handlePost(e) {
    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('foodType', foodType);
    formData.append('description', description);
    formData.append('picture', file);
    formData.append('rating', rating);

    if (!file) {
      alert('Please upload a file.');
      return;
    }

    if (e.target.checkValidity()) {
      // const post = { title, foodType, description, picture };
      const endpoint = `${API_URL}/${id ? id : ''}`;
      const method = id ? 'PATCH' : 'POST';

      try {
        const response = await fetch(endpoint, {
          method: method,
          // browser default????
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          body: formData,
        });

        const json = await response.json();

        if (!response.ok) {
          console.error(json.error);
        } else {
          if (!id) {
            setTitle('');
            setFoodType('');
            setDescription('');
            setFile(null);
            setRating(0);
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
        encType='multipart/form-data'
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

        <label htmlFor='rating-button-id'>Rating:</label>
        <div className='rating'>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <button
                id='rating-button-id'
                type='button'
                key={ratingValue}
                className={`btn ${ratingValue <= (rating || 0) ? 'on' : ''}`}
                onClick={() => setRating(ratingValue)}
                style={{
                  fontSize: '40px',
                  color: 'yellow',
                  WebkitTextStroke: '1px black',
                }}
              >
                <span className='star'>&#9733;</span>
              </button>
            );
          })}
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

        <div className='input-group mb-3'>
          <input
            type='file'
            className='form-control'
            id='inputGroupFile02'
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <label className='input-group-text' htmlFor='inputGroupFile02'>
            Upload
          </label>
        </div>

        <button type='submit' className='btn btn-primary'>
          POST!
        </button>
      </form>
    </>
  );
}

export default PictureForm;
