
import {useState} from 'react';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';


function PlaceOrderScreen() {
    //STATE:
    const cart = useSelector((state) => state.cart);

    //Calculate prices
    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty, 
        0
    )

    //Functions:
    const placeOrderHandler = () => {
        console('order')
    }


    //Rendered kelements:
    return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Livraison</h2>
                        <p>
                            <strong>Adresse: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                            {cart.shippingAddress.postalCode}, {' '}
                            {cart.shippingAddress.country}, 
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Mode de paiement</h2>
                        <strong>Mode: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Articles commandés: </h2>
                        {cart.cartItems.length === 0 ? <Message>Votre panier est vide</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price}€ = {item.qty * item.price}€ 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                        <strong></strong>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Récapitulatif de la commande</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Articles</Col>
                                <Col>{cart.itemsPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Livraison</Col>
                                <Col>{cart.shippingPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Taxe</Col>
                                <Col>{cart.taxPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Totale</Col>
                                <Col>{cart.totalPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-center'>
                            <Button 
                            type='button' 
                            className='btn-block' 
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}
                            >
                                Passer la commande
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    )
}

export default PlaceOrderScreen

