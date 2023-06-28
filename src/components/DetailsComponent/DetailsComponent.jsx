import './DetailsComponent.css';

const DetailsComponent = ({ productDetails }) => {
  const {
    brand,
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
  } = productDetails;

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={imgUrl} alt={model} />
      </div>
      <div className="product-details-text">
        <ul>
          <li className="product-details-title">
            <h1>
              {brand || '-'} {model || '-'}
            </h1>
          </li>
          <li className="product-details-price">{price || '- '}€</li>
          <li>
            <span>CPU:</span> {cpu || '-'} RAM:{ram || '-'}
          </li>
          <li>
            <span>OS:</span> {os || '-'}
          </li>
          <li>
            <span>Resolution:</span> {displayResolution || '-'}
          </li>
          <li>
            <span>Battery:</span> {battery || '-'}
          </li>
          <li>
            <span>Primary Camera:</span> {primaryCamera || '-'}
          </li>
          <li>
            <span>Secondary Camera:</span> {secondaryCamera || '-'}
          </li>
          <li>
            <span>Dimentions:</span> {dimentions || '-'}
          </li>
          <li>
            <span>Weight:</span> {weight || '- '}gr
          </li>
        </ul>
        <div></div>
      </div>
    </div>
  );
};

export default DetailsComponent;
