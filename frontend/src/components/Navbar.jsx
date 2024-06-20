import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-body-tertiary'>
      <div className='container-fluid d-flex justify-content-between align-items-center'>
        {/* Logo and Site Title */}
        <Link className='navbar-brand d-flex align-items-center' to='/'>
          <img
            src={logo}
            alt='Logo'
            width='50'
            className='d-inline-block align-text-top me-2'
          />
          Plate Critique
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='justify-content-end' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/post'>
                Post
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
