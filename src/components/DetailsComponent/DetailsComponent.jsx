import { useState, useEffect, useRef, useCallback } from 'react';
import { usePageInfo } from "../../context/pageContext";
import axios from 'axios';
import './DetailsComponent.css';

const DetailsComponent = () => {
  const { productDetails, setShoppingCartItems } = usePageInfo();
  const {
    brand,
    colors,
    model,
    price,
    cpu,
    ram,
    os,
    displayResolution,
    battery,
    imgUrl,
    primaryCamera,
    secondaryCamera,
    dimentions,
    weight,
    internalMemory,
    id
  } = productDetails;
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showMemoryDropdown, setShowMemoryDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [memory, setMemory ] = useState(null);
  const [errorColor, setErrorColor] = useState(false);
  const [errorMemory, setErrorMemory] = useState(false);

  const colorsRef = useRef(null);
  const memoryRef = useRef(null);


  useEffect(() => {
    if(colors && colors.length === 1) {
      setSelectedColor(colors[0])
    }

    if(internalMemory && internalMemory.length === 1) {
      setMemory(internalMemory[0]);
    }
  
    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // eslint-disable-line

  const handleClickOutside = useCallback((event) => {
    if (colorsRef.current && !colorsRef.current.contains(event.target)) {
      setShowColorDropdown(false);
    }
    if (memoryRef.current && !memoryRef.current.contains(event.target)) {
      setShowMemoryDropdown(false);
    }
  }, []);

  
  const addToCart = () => {
    if(!selectedColor || !memory) {
      setErrorColor(!selectedColor);
      setErrorMemory(!memory);
      return;
    }
  
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      id: id,
      colorCode: selectedColor,
      storageCode: memory
    };
    axios.post("https://itx-frontend-test.onrender.com/api/cart", body, headers)
    .then(response => {
      setShoppingCartItems(response.data.count);
    });
};
  

  const listItem = (title, data) => <li>
                                        <span>{title}:</span> {data || '-'}
                                    </li>

const dropdownElement = (selected, items, onChange, open, show, ref, error, setError) => {
    return <div>
              <div className={`details-dropdown-input ${error ? "error" : ""}`} onClick={() => open(true)}>
                {selected || "Choose"}
                <span>+</span>
              {show ? <div className="details-dropdown-list" ref={ref}>
                  {items ? items.map(item => {
                    return <div key={item} onClick={() => [onChange(item), open(false), setError(false)]}  className="details-dropdown-item">
                    {item}
                    </div>
                  }) : <></>}
                </div> : <></>}
              </div>
            </div>
}

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={imgUrl} alt={model} />
      </div>
      <div>
        <div className="product-details-text">
            <ul>
            <li className="product-details-title">
                <h1>
                {brand || '-'} {model || '-'}
                </h1>
            </li>
            <li className="product-details-price">{price || '- '}€</li>
            {listItem("CPU", cpu)}
            {listItem("RAM", ram)}
            {listItem("OS", os)}
            {listItem("Resolution", displayResolution)}
            {listItem("Battery", battery)}
            {listItem("Primary Camera", primaryCamera)}
            {listItem("Secondary Camera", secondaryCamera)}
            {listItem("Dimentions", dimentions)}
            {listItem("Weight", weight)}
            </ul>
        </div>
        <div className="details-actions-container">
            <div className="details-dropdown-container">
                {dropdownElement(selectedColor, colors, setSelectedColor, setShowColorDropdown, showColorDropdown, colorsRef, errorColor, setErrorColor)}
                {dropdownElement(memory, internalMemory, setMemory, setShowMemoryDropdown, showMemoryDropdown, memoryRef, errorMemory, setErrorMemory)}
            </div>
            <div className="shop-button" onClick={() => addToCart()}>
              Add to cart
            </div>
        </div>
      </div>
      </div>
  );
};

export default DetailsComponent;
