

import {useEffect, useRef} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import {useSelector, useDispatch} from 'react-redux'
import {listProducts} from '../features/products/productListSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';




function HomeScreen() {
  // STATE
  const {products, isLoading, isError, message} = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const effectRan = useRef(false);

  useEffect(()=> {
    if(effectRan.current === false){
      dispatch(listProducts());
      console.log('effect ran');
      return () => {
        effectRan.current = true
        console.log(`unmounted`)
      }
    }
  }, [dispatch]);


  // Rebdered Element
  return (
    <>
        <h1>Nouveaux Produits</h1>
        {isLoading ? (
          <Loader/>
          ) : isError ? ( 
          <Message>{message}</Message>
          ) : (
          <Row>
           {products.map((product)=>(
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product} />
              </Col> 
           ))}
          </Row>
        ) }
    </>
  )
}

export default HomeScreen;








