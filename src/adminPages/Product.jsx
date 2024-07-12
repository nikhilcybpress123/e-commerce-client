import React from 'react'
import Sidebar from '../components/Sidebar'
import '../scss/styles/product.scss'
import DataGridDemo from '../components/DataGridDemo'

const Product = () => {
  return (
    <div className="product">
    <Sidebar />
    <div className="product__content">
    <div className="product__header">
          <button className="product__add-button">Add Product</button>
        </div>
     <DataGridDemo />
    </div>
  </div>
  )
}

export default Product
