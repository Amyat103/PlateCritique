import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-body-tertiary'>
      <div className='container-fluid custom-container d-flex justify-content-between align-items-center flex-nowrap'>
        <Link className='navbar-brand d-flex align-items-center' to='/'>
          <img
            src={logo}
            alt='Logo'
            width='50'
            className='d-inline-block align-text-top me-2'
          />
          Plate Critique
        </Link>

        <div className='d-flex justify-content-end'>
          <ul className='navbar-nav flex-row'>
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
