import { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import useEcomStore from "@/store/ecom-store";
import { payment } from "@/api/stripe";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RdFGuQ1jZKZV8HORgQmO8wTQ5j3eth7H4NBMZNZWxhZQKZDbeFmKw8JMftKXF1AlsP4AJIULAkshCBgHdk1gIxl009syAeB7X");

const Payment = () => {
  const token = useEcomStore((state)=>state.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
    payment(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const appearance = {
    theme: "stripe",
  };

  return (
    <div className="p-8 bg-white rounded-md">
      {
        clientSecret && (
          <Elements 
            options={{ clientSecret, appearance }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )
      }
    </div>
  )
}
export default Payment