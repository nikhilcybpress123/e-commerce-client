import React, { useState } from 'react'
import '../scss/styles/addproduct.scss'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { addProductStart,addProductSuccess,addProductFailure,fetchProducts } from '../redux/produtRedux';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [photo, setPhoto] = useState(null);
    const [product, setProduct] = useState({ title: '', desc: '', price: '', categories: 'women', inStock: 'true' });
   const dispatch = useDispatch();

   const navigate = useNavigate()

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProductStart());
    try {
      await axios.get('/api/products', product);
      console.log("kkkk",product);
      dispatch(addProductSuccess());
      dispatch(fetchProducts());  
      navigate('/admin/product')
    } catch (err) {
      dispatch(addProductFailure());
    }
  };

    return (
        <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="addProductItem">
            <label>Image</label>
            <div className="photo-upload">
              <div className="photo-upload__item">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="photo">
                  {photo ? (
                    <img src={photo} alt="Product" />
                  ) : (
                    <span>Add Photo</span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="Apple Airpods"
              value={product.title}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea
              name="desc"
              rows="5"
              placeholder="description..."
              value={product.desc}
              onChange={handleChange}
              className="description-input"
            ></textarea>
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <select name="categories" value={product.categories} onChange={handleChange}>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" value={product.inStock} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button type="submit" className="addProductButton">
            Create
          </button>
        </form>
      </div>
    );
  };
export default AddProduct
