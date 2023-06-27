import {useEffect, useState} from 'react';
import axios from 'axios';

const Root = () => {
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [search, setSearch] = useState(null);

    useEffect(() => {
      axios.get("https://itx-frontend-test.onrender.com/api/product")
      .then(response => {
        setProducts(response.data);
        console.log(response.data)
      })
      .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if(products) {
            const productsToFilter = [...products];
            const filtered = productsToFilter.filter(product => product.brand.toLowerCase().includes(search) || product.model.toLowerCase().includes(search));
            setFilteredProducts(filtered);
        }
    }, [search])
    

    const productsToRender = filteredProducts ? filteredProducts : products;

  return (
    <div>
        <input type="text" onChange={(event) => setSearch(event.target.value)}/>
        {productsToRender ? productsToRender.map(product => {
            return <div>
                        <div>{product.brand}</div>
                        <div>{product.model}</div>
                    </div>
        }) : <></>}
    </div>
  )
}

export default Root;