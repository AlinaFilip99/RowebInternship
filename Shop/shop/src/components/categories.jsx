import React, { useState, useEffect } from 'react'
import Api from '../Api'
import {Table, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Categories=(props)=>{
    const [categories, setCategory]=useState([]);

    useEffect(()=>{Api.CategoryRepository.all().then((x)=> setCategory(x));}, [props]);

    const DeleteCategory= (id) =>{  
        Api.CategoryRepository.delete(id) ;
        props.updateList()
    }

    return(
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead> 
            <tbody>
                {categories.map((x)=>(
                    <tr key={x.categoryId}>
                        <td>{x.categoryId}</td>
                        <td>{x.categoryName}</td>
                        <td>{x.description}</td>
                        <td>
                            <Nav.Link as={Link} to={`/admin/editCategory/${x.categoryId}`}>
                                 Edit
                            </Nav.Link>
                        </td>
                        <td>
                            <button onClick={()=>DeleteCategory(x.categoryId)} className="btn btn-danger">
                                 Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

}

export default Categories;