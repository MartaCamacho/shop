import { useState } from 'react';
import './DetailsComponent.css';

const DetailsComponent = ({ productDetails }) => {
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
    internalMemory
  } = productDetails;
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showMemoryDropdown, setShowMemoryDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [memory, setMemory ] = useState(null);

  const listItem = (title, data) => <li>
  <span>{title}:</span> {data || '-'}
</li>

const dropdownElement = (selected, items, onChange, open, show) => {
    return <div>
              <div className="details-dropdown-input" onClick={() => open(true)}>
                {selected || "Choose"}
                <span>+</span>
              {show ? <div className="details-dropdown-list">
                  {items ? items.map(item => {
                    return <div key={item} onClick={() => [onChange(item), open(false)]}  className="details-dropdown-item">
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
        <div>
            <div className="details-dropdown-container">
                {dropdownElement(selectedColor, colors, setSelectedColor, setShowColorDropdown, showColorDropdown)}
                {dropdownElement(memory, internalMemory, setMemory, setShowMemoryDropdown, showMemoryDropdown)}
            </div>
        </div>
      </div>
      </div>
  );
};

export default DetailsComponent;
