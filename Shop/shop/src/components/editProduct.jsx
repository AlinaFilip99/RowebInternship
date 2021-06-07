import React, { useState, useEffect } from 'react'
import Api from '../Api'

const EditProductForm = (props) => {
    const [product, setProduct]=useState([]);

    useEffect(()=>{Api.ProductRepository.getById(props.match.params.id).then((x)=> setProduct(x));}, [props]);

    const handleInputChange = (event) => {
        const { name, value } = event.target
    
        setProduct({ ...product, [name]: value })
    }

    const updateProduct=(product)=>{
        Api.ProductRepository.update(product)
    }

    return (
        <div className='col-4 p-4'>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!product.name || !product.price || !product.basePrice || !product.categoryId) return
    
            updateProduct(product)
          }}
        >
            <div className="form-group">
            <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="form-control"
          />
            </div>
          <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="form-control"
          />
          </div>
          <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="form-control"
          />
          </div>
          <div className="form-group">
          <label>Base price</label>
          <input
            type="text"
            name="basePrice"
            value={product.basePrice}
            onChange={handleInputChange}
            className="form-control"
          />
          </div>
          <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="categoryId"
            value={product.categoryId}
            onChange={handleInputChange}
            className="form-control"
          />
          </div>
          <div className="form-group">
          <button className="btn btn-primary">Edit</button>
          </div>
        </form>
        </div>
    )

}

export default EditProductForm;