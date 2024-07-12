import React from 'react'
import '../scss/styles/productdetails.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const ProductDetails = () => {
    const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`); 
        setProduct(response.data);
        
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0].name); 
        }
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
       
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
   
    console.log(`Added ${product.title} to cart with color ${selectedColor} and size ${selectedSize}`);
  };
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <div className="single-product">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div className="color-options">
          <span>Colors:</span>
          {product.colors.map((color, index) => (
            <button
              key={index}
              className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
              style={{ backgroundColor: color.indicator }}
              onClick={() => handleColorChange(color.name)}
            >
              
            </button>
          ))}
        </div>
        <div className="size-options">
          <span>Sizes:</span>
          {product.sizes.map((size, index) => (
            <button
              key={index}
              className={`size-option ${selectedSize === size ? 'active' : ''}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="add-to-cart" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};


export default ProductDetails
