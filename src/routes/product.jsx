import {useEffect} from 'react';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { usePageInfo } from "../context/pageContext";

const Product = () => {
  let location = useLocation();
  const productId = location.pathname.replace('/product/', "");
  const { productDetails, setProductDetails } = usePageInfo();

  useEffect(() => {
    axios.get(`https://itx-frontend-test.onrender.com/api/product/${productId}`)
    .then(result => {
      setProductDetails(result.data);
    })
    .catch(error => console.error(error));
  }, []);
  

  return (
    <div>
      {productDetails ? <DetailsComponent productDetails={productDetails}/> : <>No details available</>}
    </div>
  )
}

export default Product