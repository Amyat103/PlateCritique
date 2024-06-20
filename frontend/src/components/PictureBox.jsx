import PropTypes from 'prop-types';
import { usePictureContext } from './hooks/usePictureContext';
import delete_icon from '../assets/delete_icon.png';
import { useNavigate } from 'react-router-dom';

function PictureBox({ picture }) {
  const { dispatch } = usePictureContext();
  const navigate = useNavigate();

  if (!picture) {
    return <div>No Data Error</div>;
  }

  async function handleDelete() {
    const response = await fetch('http://localhost:4000/' + picture._id, {
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
    <div className='picture-box'>
      <h3>{picture.title}</h3>
      <h4>{picture.foodType}</h4>
      <p>{picture.picture}</p>
      <p>
        <strong>{picture.description}</strong>
      </p>
      <p>Posted On: {new Date(picture.createdAt).toLocaleString()}</p>
      <span onClick={handleDelete}>
        <img
          src={delete_icon}
          alt='Delete'
          className='img-fluid icon-hover-effect'
          style={{ cursor: 'pointer', width: '24px', height: '24px' }}
          width={30}
          color='black'
        />
      </span>
      <button onClick={handleUpdate}>Update</button>
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
  }).isRequired,
};

export default PictureBox;
