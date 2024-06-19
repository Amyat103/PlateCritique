import { useState } from 'react';

function PictureForm() {
  const [title, setTitle] = useState('');
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');

  return (
    <>
      <form>
        <h2>Upload A Post</h2>
        <label>Post Title:</label>
        <input
          type='text'
          className='form-control mb-3'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={3}
          maxLength={100}
        ></input>
        <label>Food Type:</label>
        <select
          type='text'
          className='form-control mb-3'
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        >
          <option value=''>Select Food Type</option>
          <option value='Snack'>Snack</option>
          <option value='Breakfast'>Breakfast</option>
          <option value='Brunch'>Brunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Lunch'>Lunch</option>
        </select>
        <label>Description:</label>
        <input
          type='text'
          className='form-control mb-3'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={300}
          minLength={5}
        ></input>
        <label>Picture:</label>
        <input
          type='text'
          className='form-control mb-3'
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          required
        ></input>
        <button type='submit' className='btn btn-primary'>
          POST!
        </button>
      </form>
    </>
  );
}

export default PictureForm;
