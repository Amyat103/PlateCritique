import PropTypes from 'prop-types';
import { usePictureContext } from './hooks/usePictureContext';
import delete_icon from '../assets/delete_icon.png';
import { useNavigate } from 'react-router-dom';
import './PictureBox.css';

function PictureBox({ picture }) {
  const { dispatch } = usePictureContext();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  if (!picture) {
    return <div>No Data Error</div>;
  }

  async function handleDelete() {
    const response = await fetch(`${API_URL}/${picture._id}`, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_POST', payload: json });
    }
  }

  const handleUpdate = () => {
    navigate(`/post/${picture._id}`);
  };

  return (
    <div className='card h-100 d-flex flex-column'>
      {/* bootstrap change height percent */}
      <div className='image-container flex-shrink-0' style={{ height: '40%' }}>
        <img
          src={`${API_URL}/images/${picture.picture}`}
          className='card-img-top h-100 w-100'
          alt={picture.title}
          style={{ objectFit: 'contain', backgroundColor: 'white' }}
        />
      </div>
      <div className='card-body flex-grow-1 d-flex flex-column'>
        <h5 className='card-title'>{picture.title}</h5>
        <h6 className='card-subtitle mb-2'>{picture.foodType}</h6>
        <div className='rating-display'>
          {Array(picture.rating)
            .fill()
            .map((_, i) => (
              <span key={i} className='star'>
                &#9733;
              </span>
            ))}
        </div>
        <p className='card-text description'>{picture.description}</p>
      </div>
      <div className='card-footer mt-auto'>
        <small className='text-muted'>
          {new Date(picture.createdAt).toLocaleString()}
        </small>
        <div className='d-flex justify-content-between mt-2 align-items-center'>
          <button
            type='button'
            className='btn btn-outline-danger update-button'
            onClick={handleUpdate}
          >
            Update
          </button>
          <img
            src={delete_icon}
            alt='Delete'
            className='delete-icon'
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

PictureBox.propTypes = {
  picture: PropTypes.shape({
    title: PropTypes.string.isRequired,
    foodType: PropTypes.string.isRequired,
    description: PropTypes.string,
    picture: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default PictureBox;
