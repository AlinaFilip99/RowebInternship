import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Api from '../Api'

const Sidebar= (props)=>{
    const [categories, setCategory]=useState([]);

    useEffect(()=>{Api.CategoryRepository.all().then((x)=> setCategory(x));}, [props]);


    return(
        <Nav className="col-md-12 d-md-block bg-light">
            <Nav.Item>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            </Nav.Item>

            {categories.map((x)=>(
            <Nav.Item key={x.categoryId}>
                <Nav.Link as={Link} to={`/products/${x.categoryId}`}>{x.categoryName}</Nav.Link>
            </Nav.Item>))}
        </Nav>
    );
}

export default Sidebar;