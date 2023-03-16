
import {useState} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {saveShippingAddress} from '../features/cart/cartSlice';


function ShippingScreen() {
    //STATE:
    const {shippingAddress} = useSelector((state) => state.cart)

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);


    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //FUNCTIONS/
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment')
    }

    //RENDERED ELEMENTS
    return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Livraison</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                type='text'
                placeholder='Votre adresse'
                value={address || []}
                required
                onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Ville</Form.Label>
                <Form.Control
                type='text'
                placeholder='Votre ville'
                value={city || []}
                required
                onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Code Postal</Form.Label>
                <Form.Control
                type='text'
                placeholder='Votre code postal'
                value={postalCode || []}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Pays</Form.Label>
                <Form.Control
                type='text'
                placeholder='Votre pays'
                value={country || []}
                required
                onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Continuer
            </Button>
        </Form>
    </FormContainer>
    )
}

export default ShippingScreen




