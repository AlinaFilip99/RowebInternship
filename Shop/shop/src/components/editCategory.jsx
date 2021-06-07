import React, { useState, useEffect } from 'react'
import Api from '../Api'

const EditCategoryForm = (props) => {
    const [category, setCategory]=useState([]);

    useEffect(()=>{Api.CategoryRepository.getById(props.match.params.id).then((x)=> setCategory(x));}, [props]);

    const handleInputChange = (event) => {
        const { name, value } = event.target
    
        setCategory({ ...category, [name]: value })
    }

    const updateCategory=(category)=>{
        Api.CategoryRepository.update(category)
    }

    return (
        <div className='col-4 p-4'>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!category.categoryName || !category.description) return
    
            updateCategory(category)
          }}
        >
            <div className="form-group">
            <label>Name</label>
          <input
            type="text"
            name="categoryName"
            value={category.categoryName}
            onChange={handleInputChange}
            className="form-control"
          />
            </div>
          <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={category.description}
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

export default EditCategoryForm;