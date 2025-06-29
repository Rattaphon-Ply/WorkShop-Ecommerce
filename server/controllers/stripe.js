const prisma = require('../config/prisma')
const stripe = require('stripe')(''); //Key

exports.payment = async(req,res)=> {
    try {
        //code
        // Check User
        // req.user.id
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: req.user.id
            }
        })
        const amountTHB = Math.round(cart.cartTotal * 100)

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountTHB,
            currency: "THB",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        // err
        console.log(err)
        res.status(500).json({ message: "Serverr Error" })
    }
}