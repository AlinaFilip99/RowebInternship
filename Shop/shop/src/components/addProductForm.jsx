import React, { useEffect, useState } from 'react'
import Api from '../Api'

const AddProductForm = (props) => {
    const initialFormState = { name: '', description: '',  price: '', basePrice: '', categoryId: ''}
    const [product, setProduct] = useState(initialFormState)
    const [file, setFile] = useState()
    const [categories, setCategories]=useState([])

    useEffect(()=>{Api.CategoryRepository.all().then((x)=> setCategories(x));}, [props]);

    const handleFile=(e) =>{
      const formData=new FormData();
      formData.append("file", e.target.files[0]);
      setFile(formData)
    } 

    const handleInputChange = (event) => {
        const { name, value } = event.target
    
        setProduct({ ...product, [name]: value })
    }

    const addProduct=async (product)=>{
      const prod= await Api.ProductRepository.insert(product);

      if(file){
        Api.ProductRepository.uploadImage(prod.productId, file)
      }
    }

    return (
        <div className='col-4 p-4'>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!product.name || !product.price || !product.basePrice || !product.categoryId) return
            
            addProduct(product)
            setProduct(initialFormState)
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
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleInputChange}
            className="form-control"
          >
            {categories.map((x)=>(
              <option value={x.categoryId}>{x.categoryId}</option>
            ))}
          </select>
          </div>
          <div className="form-group">
          <input type="file" onChange={e => handleFile(e)} />
          </div>
          <div className="form-group">
          <button className="btn btn-primary">Add</button>
          </div>
        </form>
        </div>
    )

}

export default AddProductForm;