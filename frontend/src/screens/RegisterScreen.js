
import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {register} from '../features/auth/authSlice';



function RegisterScreen() {
    //STATE
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msge, setMessage] = useState(null)
    

    // Let's select pieces of our state (global state) from auth/authSlice
    const {user, isLoading, isError, message} = useSelector((state) => state.auth);
    
    //Let's dispatch the register action from auth/authSlice
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (user) {
          navigate(redirect)
        }
      }, [user, navigate, redirect])


    //Functions:
    const submitHandler = (e) => {
        e.preventDefault();

        //Check if psw not match
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            //If psw match
            dispatch(register({ name, email, password }))
        }
    }


    //Rendered elements
    return (
    <FormContainer>
        <h1>S'inscrire</h1>

        {msge && <Message variant='danger'>{msge}</Message>}
        {isError && <Message>{message}</Message>}
        {isLoading && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                type='text'
                placeholder='Entrer votre nom'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                placeholder='Entrer votre email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                type='password'
                placeholder='Entrer votre mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                type='password'
                name='confirmPassword'
                placeholder='Entrer votre mot de passe'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className='mt-3'>
                S'inscrire
            </Button>

        </Form>

        <Row className ="py-3">
            <Col>
                Vous avez déjà un compte?{' '}
                <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' } > 
                     S'identifier
                </Link>
            </Col>
        </Row>
    </FormContainer>
    )
}

export default RegisterScreen

