import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_CART } from '../../redux/reducer/cart.reducer';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

export const Cart = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem('cartTotalPrice')));
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));
  }, [items, totalPrice]);

  const handleClick = () => {
    dispatch(DELETE_CART());
    setItems([]);
    setTotalPrice(0);
  };

  return (
    <Container className="mt-4">
      {items.length === 0 ? (
        <p className="text-center"><span className='bg-brown-light rounded'>Pas d'articles dans le panier</span></p>
      ) : (
        <>
          <h2 className="mb-4"><span className='bg-brown-light rounded'>Bonjour, vous avez commandé :</span></h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Quantité</th>
                <th>Article</th>
                <th>Prix total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x._id}>
                  <td>{x.quantity}</td>
                  <td>{x.name}</td>
                  <td>{x.price * x.quantity} €</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="text-right">
            <strong>Total :</strong> {totalPrice} €
          </p>
          <Row className="justify-content-end">
            <Col xs="auto">
              <Button variant="danger" onClick={handleClick}>
                Supprimer le panier
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="primary">Payer</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};