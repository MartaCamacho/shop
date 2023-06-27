import React from 'react';
import './HeaderComponent.css';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

const HeaderComponent = () => {
  const params = useParams();

  console.log(params, window.location)
  const breadCrumbItem = (url, text) => {
    if(window.location.pathname === url) {
      return <div>{text}</div>
    } else {
      return <Link to={url}>{text}</Link>
    }
  }

  return (
    <div className='header-container'>
      <Link to="/">
        <img src="/storeLogo.jpg" alt="logo" className='header-logo' />
      </Link>
      <ul className='bread-crumbs'>
        <li>{breadCrumbItem("/", "Home")}</li>
        {true ? <li>{breadCrumbItem("/product/:productId", "Product")}</li> : <></>}
      </ul>
      <div className='header-cart'>
        <img src="/images/cart-shopping-solid.svg" alt="cart" />
      </div>
    </div>
  )
}

export default HeaderComponent