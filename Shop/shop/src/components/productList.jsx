import React, { useState, useEffect } from 'react'
import Api from '../Api'
import {Table, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ProductList=(props)=>{
    const [products, setProduct]=useState([]);

    useEffect(()=>{Api.ProductRepository.allProducts().then((x)=> setProduct(x));}, [props]);

    const DeleteProduct= (id) =>{  
        Api.ProductRepository.delete(id);
        props.updateList()
    }

    return(
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Base price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead> 
            <tbody>
                {products.map((x)=>(
                    <tr key={x.productId}>
                        <td>{x.productId}</td>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td>{x.price}</td>
                        <td>{x.basePrice}</td>
                        <td>{x.image}</td>
                        <td>{x.categoryId}</td>
                        <td>
                            <Nav.Link as={Link} to={`/admin/editProduct/${x.productId}`}>
                                 Edit
                            </Nav.Link>
                        </td>
                        <td>
                            <button onClick={()=>DeleteProduct(x.productId)} className="btn btn-danger">
                                 Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

}

export default ProductList;