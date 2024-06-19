import PropTypes from 'prop-types';

function PictureBox({ picture }) {
  if (!picture) {
    return <div>No Data Error</div>;
  }

  return (
    <div className='picture-box'>
      <h3>{picture.title}</h3>
      <h4>{picture.foodType}</h4>
      <p>{picture.picture}</p>
      <p>
        <strong>{picture.description}</strong>
      </p>
      <p>Posted On: {new Date(picture.createdAt).toLocaleString()}</p>
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
  }).isRequired,
};

export default PictureBox;
