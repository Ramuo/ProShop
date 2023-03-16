
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {updateUserProfile} from '../features/auth/authSlice';

function ProfileScreen() {
    //STATE:
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msge, setMessage] = useState(null)

    // Let's select pieces of our state (global state) from auth/authSlice
    const { isSuccess, isLoading, isError, message, user } = useSelector(
      (state) => state.auth,
    )
  


    //const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      if (!user) {
        navigate('/login')
      } else {
        //   if (!user.name) {
        // dispatch(getUserDetails('profile'))
        //   } else {
        setName(user.name)
        setEmail(user.email)
      }
    }, [user, navigate, dispatch])

    //Functions:
    const submitHandler = (e) => {
        e.preventDefault();

        //Check if psw not match
        if(password !== confirmPassword){
            setMessage("Mot de passe n'est pas conforme")
        }else{
            //If psw match //let's dispatch register and pass in userData
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

        setPassword('')
        setConfirmPassword('')
    }


    //Renderred element:
    return (
        <Row>
        <Col md={3}>
          <h2>Profil utilisateur</h2>
          {msge && <Message>{msge}</Message>}
          {isError && <Message>{message}</Message>}
          {isSuccess && <Message variant="success">Profil Modifié</Message>}
          {isLoading && <Loader />}
  
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="name"
                placeholder="Modifier votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
  
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
  
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmer votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
  
            <Button type="submit" variant="primary" className='mt-3'>
              Modifier
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Mes commandes</h2>
        </Col>
      </Row>
    )
}

export default ProfileScreen

