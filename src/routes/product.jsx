import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageInfo } from '../context/pageContext';
import axios from 'axios';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const Product = () => {
  let location = useLocation();
  const productId = location.pathname.replace('/product/', '');
  const { productDetails, setProductDetails, setItemWithExpiry } = usePageInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProduct = localStorage.getItem(productId);
    if (savedProduct) {
      const item = JSON.parse(savedProduct);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(productId);
        fetchData();
      } else {
        setLoading(false);
        return setProductDetails(item.value);
      }
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line

  const fetchData = () => {
    axios
      .get(`https://itx-frontend-test.onrender.com/api/product/${productId}`)
      .then((response) => {
        setProductDetails(response.data);
        setItemWithExpiry(response.data, productId);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : productDetails ? (
        <DetailsComponent />
      ) : (
        <div className="search-no-results">No details available</div>
      )}
    </div>
  );
};

export default Product;
