import Stripe from 'stripe'
import { env } from '../config/index.js'


const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export const createPaymentIntent = async(req,res,next) => {
  try{
    const {amount, currency} = req.body

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    })

    res.status(200).json({clientSecret: paymentIntent.client_secret})
  }catch(err){
    res.status(500).json({error: err.message})
  }
}