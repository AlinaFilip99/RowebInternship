import React, { useState} from 'react'
import Categories from './categories'
import ProductList from './productList'
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Admin=()=>{
    const [updateList, setUpdateList]=useState(false);

    return(
        <div>
            <div className="p-4">
                <Nav.Link as={Link} to="/admin/addCategory">Add category</Nav.Link>
            </div>
            <div className="p-4">
                <Categories updateList={()=>{
                    if(updateList===false){
                        setUpdateList(true)
                    }
                    else{
                        setUpdateList(false)
                    }
                }} shouldUpdateList={updateList} perPage={3}/>
            </div>
            <div className="p-4">
                <Nav.Link as={Link} to="/admin/addProduct">Add product</Nav.Link>
            </div>
            <div className="p-4">
                <ProductList updateList={()=>{
                    if(updateList===false){
                        setUpdateList(true)
                    }
                    else{
                        setUpdateList(false)
                    }
                }} shouldUpdateList={updateList} perPage={3}/>
            </div>
        </div>
    );

}

export default Admin;