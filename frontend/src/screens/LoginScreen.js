import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login, reset} from '../features/auth/authSlice';
import FormContainer from '../components/FormContainer'



function LoginScreen() {
    //STATE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { isLoading, isError, message, user } = useSelector(
        (state) => state.auth,
    )

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (user) {
          navigate(redirect)
        }
    
        return () => {
          dispatch(reset())
        }
    }, [user, navigate, redirect, dispatch])

    //Functions
    //To submit the form
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({email, password}));
    }

    //Rendered elements
    return (
    <FormContainer>
        <h1>Mon compte</h1>

        {isError && <Message variant='danger'>{message}</Message>}
        {isLoading && <Loader/>}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                placeholder='Entrer votre email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                >
                </Form.Control>
            </Form.Group>

            <Button className="mt-3" type='submit' variant='primary'>
                S'identifier
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Nouveau client?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    S'inscrire
                </Link>
            </Col>
        </Row>
    </FormContainer>
    )
}

export default LoginScreen

