import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../features/auth/authSlice'


function Header() {
  // STATE
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  //Functions:
  // To logout
  const logoutHandler = () => {
    dispatch(logout());
  }


  // Rendered elements
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link >
                  <i className='fas fa-shopping-cart'></i> Panier
                </Nav.Link>
              </LinkContainer>

              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Se déconnecter</NavDropdown.Item>
                </NavDropdown>
              ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className='fas fa-user'></i> Mon Compte
                </Nav.Link>
            </LinkContainer>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header