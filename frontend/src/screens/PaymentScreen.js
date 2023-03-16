import {useState} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import {Form, Button, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {savePaymentMethod} from '../features/cart/cartSlice';


function PaymentScreen() {
    //STATE:
    const {shippingAddress} = useSelector((state) => state.cart)

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    


    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //FUNCTIONS/
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }

    //RENDERED ELEMENTS
    return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Methode de paiement</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Choisissez une Methode</Form.Label>
                <Col>
                <Form.Check 
                type='radio' 
                label='Paypal ou Carte crédit' 
                id='paypal' name='paymentMethod' 
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check>
                
                {/* <Form.Check 
                type='radio' 
                label='Stripe' 
                id='Stripe' 
                name='paymentMethod' 
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check> */}
            </Col>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>
                Continuer
            </Button>
        </Form>
    </FormContainer>
    )
}

export default PaymentScreen