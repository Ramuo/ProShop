import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


function CheckoutSteps({step1, step2, step3, step4}) {


    return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
            <LinkContainer to="/login">
                <Nav.Link>S'identifier</Nav.Link>
            </LinkContainer>
            ) : (
            <Nav.Link disabled>S'identifier</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step2 ? (
            <LinkContainer to="/shipping">
                <Nav.Link>Livraison</Nav.Link>
            </LinkContainer>
            ) : (
            <Nav.Link disabled>Livraison</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step3 ? (
            <LinkContainer to="/payment">
                <Nav.Link>Paiement</Nav.Link>
            </LinkContainer>
            ) : (
            <Nav.Link disabled>Paiement</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step4 ? (
            <LinkContainer to="/placeorder">
                <Nav.Link>Valider</Nav.Link>
            </LinkContainer>
            ) : (
            <Nav.Link disabled>Valider</Nav.Link>
            )}
        </Nav.Item>
        
    </Nav>
    )
}

export default CheckoutSteps