import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItemComponent from '../components/ListItemComponent/ListItemComponent';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import { usePageInfo } from '../context/pageContext';

const Root = () => {
  const { setItemWithExpiry } = usePageInfo();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProductList = localStorage.getItem('products');
    if (savedProductList) {
      const item = JSON.parse(savedProductList);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem('products');
        fetchData();
      } else {
        setLoading(false);
        return setProducts(item.value);
      }
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (products) {
      const productsToFilter = [...products];
      const filtered = productsToFilter.filter(
        (product) =>
          product.brand.toLowerCase().includes(search) ||
          product.model.toLowerCase().includes(search)
      );
      setFilteredProducts(filtered);
    }
  }, [search]); // eslint-disable-line

  const fetchData = () => {
    axios
      .get('https://itx-frontend-test.onrender.com/api/product')
      .then((response) => {
        setProducts(response.data);
        setItemWithExpiry(response.data, 'products');
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const productsToRender = filteredProducts ? filteredProducts : products;

  return (
    <div className="home-page-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search product"
        />
      </div>
      <div className="search-items-container">
        {loading ? (
          <LoadingComponent />
        ) : productsToRender && productsToRender.length > 0 ? (
          productsToRender.map((product) => {
            return <ListItemComponent item={product} key={product.id} />;
          })
        ) : (
          <div className="search-no-results">
            There are no products with this brand or model, please try again
          </div>
        )}
      </div>
    </div>
  );
};

export default Root;
