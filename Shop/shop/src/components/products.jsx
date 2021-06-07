import React, { useState, useEffect } from 'react'
import Api from '../Api'
import {Card, CardDeck} from 'react-bootstrap'
import './cards.css'

const Products=(props) => {
    const [products, setProduct]=useState([]);

    useEffect(()=>{Api.ProductRepository.all(props.match.params.id).then((x)=> setProduct(x));}, [props]);

    return(
      <CardDeck className='row p-2'>
      {products.map((x)=>(
        <Card key={x.productId} className='m-2 col-md-3'>
          <Card.Img className='image zoom-in' variant="top" style={{objectFit: 'contain'}}  src={`https://localhost:44363/Images/${x.image}`} />
          <Card.Body>
            <Card.Text>
              <p className='price'>Price: {x.price}</p>
              <p className='base-price'>{x.basePrice}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      </CardDeck>
    );
}

export default Products;