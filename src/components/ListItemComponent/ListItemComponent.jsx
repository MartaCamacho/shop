import React from 'react';
import './ListItemComponent.css';
import { Link } from 'react-router-dom';

const ListItemComponent = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} className="list-item-container">
      <img src={item.imgUrl} alt={item.model} className="list-item-image" />
      <div className="list-item-name">
        <span>{item.brand}</span>
        <span>{item.model}</span>
      </div>
      <div className="list-item-price">{item.price || '- '}€</div>
    </Link>
  );
};

export default ListItemComponent;
