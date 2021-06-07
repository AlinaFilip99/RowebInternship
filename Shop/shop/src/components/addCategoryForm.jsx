import React, { useState } from 'react'
import Api from '../Api'

const AddCategoryForm = () => {
    const initialFormState = { categoryId: undefined, categoryName: '', description: ''}
    const [category, setCategory] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
    
        setCategory({ ...category, [name]: value })
    }

    const addCategory=(category)=>{
        Api.CategoryRepository.insert(category)
    }

    return (
        <div className='col-4 p-4'>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!category.categoryName || !category.description) return
    
            addCategory(category)
            setCategory(initialFormState)
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
          <button className="btn btn-primary">Add</button>
          </div>
        </form>
        </div>
    )

}

export default AddCategoryForm;