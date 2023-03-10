
/*
import {useState, useEffect, useRef} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Row, Col, Form, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {productDetails} from '../features/product/productDetailsSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';


function ProductScreen() {
  //STATE
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product,
  )
  
  const [qty, setQty] = useState(1)

  const {id} = useParams();

  const effectRan = useRef(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(productDetails(id))

      return () => {
        effectRan.current = true
      }
    }
  }, [id]);


  // Functions:
  // Function add to cart
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }




  // Rendered elements
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Retour
      </Link>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message>{message}</Message>
      ) : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
               <h3>{product.name}</h3> 
            </ListGroup.Item>

            <ListGroup.Item>
               <Rating value={product.rating} text={`${product.numReviews} avis`}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Prix: {product.price}€
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Prix:
                    </Col>
                    <Col>
                      <strong>{product.price}€</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Stock
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'Disponible' : 'Epuisé'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantité</Col>
                      <Col>
                        <Form.Control 
                        as='select' 
                        value={qty} 
                        onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='d-flex justify-content-center'>
                  <Button 
                  onClick={addToCartHandler}
                  className='rounded' 
                  type='button' 
                  disabled={product.countInStock === 0}>
                    Ajouter au Panier
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
        </Col>
      </Row>
      ) }
    </>
  
  )
}

export default ProductScreen


// https://www.udemy.com/course/mern-ecommerce/learn/lecture/22484780#questions/18473210

*/

import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Form,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {productDetails} from '../features/product/productDetailsSlice';
import { addToCart, addQty } from '../features/cart/cartSlice'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product,
  )

  const [qty, setQty] = useState(1)

  const { id } = useParams()
  const effectRan = useRef(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(productDetails(id))

      return () => {
        effectRan.current = true
      }
    }
  }, [id, dispatch])

  const addToCartHandler = () => {
    // localStorage.setItem('qty', JSON.stringify(qty))

    dispatch(addToCart({ ...product, qty }))
    // dispatch(addQty(qty))
    navigate(`/cart/${id}?qty=${qty}`)
    // navigate(`/cart`)
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Retour
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>{message}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Prix: {product.price}€</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Prix:</Col>
                    <Col>
                      <strong>{product.price}€</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Stock:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'Disponible' : 'Epuisé'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Quantité</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem className='d-flex justify-content-center'>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Ajouter au Pannier
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen