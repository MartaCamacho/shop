import React from 'react';
import './HeaderComponent.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const HeaderComponent = (props) => {
  let location = useLocation();
  const productId = location.pathname.replace('/product/');

  const breadCrumbItem = (url, text, currentPage) => {
    if (currentPage) {
      return <div className="bread-crumb-no-link">{text}</div>;
    } else {
      return <Link to={url} className="bread-crumb-link">{text}</Link>;
    }
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <Link to="/">
          <img src="/storeLogo.jpg" alt="logo" className="header-logo" />
        </Link>
        <ul className="bread-crumbs">
          <li>{breadCrumbItem("/", "Home", location.pathname === "/")}</li>
          {location.pathname.includes("/product/") ? (
            <li>
              {breadCrumbItem(
                `/product/${productId}`,
                "Product",
                location.pathname.includes("/product/")
              )}
            </li>
          ) : (
            <></>
          )}
        </ul>
        <div className="header-cart">
          <img src="/images/cart-shopping-solid.svg" alt="cart" />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
