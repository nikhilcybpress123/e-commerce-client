import React from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import '../scss/styles/allproduct.scss'

const AllProducts = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts
