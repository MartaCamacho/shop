import React from 'react';
import './HeaderComponent.css';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div className='header-container'>
      <Link to="/">
        <img src="/storeLogo.jpg" alt="logo" className='header-logo' />
      </Link>
      <div>
        
      </div>
    </div>
  )
}

export default HeaderComponent