import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { usePageInfo } from "../context/pageContext";
import axios from 'axios';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const Product = () => {
  let location = useLocation();
  const productId = location.pathname.replace('/product/', "");
  const { productDetails, setProductDetails } = usePageInfo();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get(`https://itx-frontend-test.onrender.com/api/product/${productId}`)
    .then(result => {
      setProductDetails(result.data);
      setloading(false);
    })
    .catch(error => {
      console.error(error);
      setloading(false);
    });
  }, []);
  

  return (
    <div>
      {loading ? <LoadingComponent /> : 
      productDetails ? <DetailsComponent/> : 
      <div className="search-no-results">No details available</div>}
    </div>
  )
}

export default Product