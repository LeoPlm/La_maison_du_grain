import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_CART } from '../../redux/reducer/cart.reducer'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Checkout } from '../../components/checkout'
import { API_URL } from "../../config/api.js"

export const Cart = () => {
  const {auth} = useContext(AuthContext)
  const[checkout, setCheckout] = useState(null)
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem('cartTotalPrice')))
  const [totalPriceSecure, setTotalPriceSecure] = useState(0)
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const [message, setMessage] = useState(false)

  const [detailCommande, setDetailCommande] = useState({
    article : cartItems.map(item => item._id),
    quantity : cartItems.map(item => item.quantity)
  })

  const handlePayment = async() =>{
    if(!auth){
      setMessage(true)
      return
    }
    try{
      const detailsIds = await Promise.all(
        detailCommande.article.map(async(articleId, i) =>{
          const {data} = await axios.post(`${API_URL}/api/details/add`,{
            article : articleId,
            quantity : detailCommande.quantity[i]
          })
          return data._id
        })
      )
      const {data} = await axios.post(`${API_URL}/api/commande/add`, {
        user : auth._id,
        details: detailsIds
      })
      setTotalPriceSecure(data.total)  
      dispatch(DELETE_CART())
      setItems([])
      setTotalPrice(0)
      setCheckout(true)
    }catch(err){
      console.error({erreur: err.message})
    }
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));
  }, [items, totalPrice]);

  const handleClick = () => {
    dispatch(DELETE_CART());
    setItems([]);
    setTotalPrice(0);
  }

  return (
    <Container className="mt-4">
      {items.length === 0 ? (
        <p className="text-center"><span className='bg-brown-light rounded p-2 text-white'>Pas d'articles dans le panier</span></p>
      ) : (
        <>
          <h2 className="mb-4"><span className='bg-brown-light rounded p-1'>Bonjour, vous avez commandé :</span></h2>
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
          <Row className="justify-content-end">
            <Col xs="auto">
              <Button variant="danger" onClick={handleClick}>
                Supprimer le panier
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handlePayment}>Payer</Button>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              {message && <p className='text-dark fw-bold text-center mt-3 bg-danger w-75'> Veuillez-vous connecter afin de procéder au paiement</p>}
            </Col>
          </Row>
        </>
      )}
      {checkout && (
            <div>
                <h3 className='bg-brown-light resorb-bg rounded p-1'>Procéder au paiement</h3>
                <Checkout totalPrice={totalPriceSecure}/>
            </div>
        )}
    </Container>
  );
};