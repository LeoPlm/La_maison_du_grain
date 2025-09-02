import { useState } from "react"
import {loadStripe} from '@stripe/stripe-js'
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import axios from "axios"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { API_URL } from "../config/api.js"

const stripePromise = loadStripe("pk_test_51Q8Hi9Rpi5aYL3gHSNDMDfPccYjrMCP26p6jwhlTBGpUinwYv2OStBWTmMnXkVOwKLzHjwpmEcNyghiVwM9WQcYM00Orbi8uxf")

const CheckoutForm = ({totalPrice}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) =>{
    event.preventDefault()
    setLoading(true)

    const {data} = await axios.post(`${API_URL}/api/stripe/create-payment-intent`, {
      amount: 1000,
      currency: "eur"
    })

    const {error, paymentIntent} = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    })
    setLoading(false)

    if (error) {
      console.error(error);
      alert("Échec du paiement !");
  } else if (paymentIntent.status === "succeeded") {
      alert("Paiement réussi !")
  }
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Informations de paiement</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100"
                  disabled={!stripe || loading}
                >
                  {loading ? "Paiement en cours..." : `Payer ${totalPrice} €`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const Checkout = ({ totalPrice }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalPrice={totalPrice} />
  </Elements>
);
