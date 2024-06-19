import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h2>Home</h2>
        </Link>
        <Link to='/post'>
          <h2>Post</h2>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
