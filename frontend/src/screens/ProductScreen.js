import {Link, useParams} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products'

function ProductScreen() {
  const {id} = useParams();
  const product = products.find((p) => p._id === id)


  // Rendered elements
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Retour
      </Link>
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
                      {product.countInStock > 0 ? 'Disponible' : 'Épuisé'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='d-flex justify-content-center'>
                  <Button className='rounded' type='button' disabled={product.countInStock === 0}>
                    Ajouter au Panier
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  
  )
}

export default ProductScreen


// https://www.udemy.com/course/mern-ecommerce/learn/lecture/22484780#questions/18473210