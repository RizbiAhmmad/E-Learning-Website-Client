import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [transactionId, setTransactionId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  
  useEffect(() => {
    axiosSecure
      .get(`/classes/${id}`)
      .then((response) => {
        setCourse(response.data);

        console.log(response.data);

        if (response.data?.price > 0) {
          axiosSecure
            .post("/create-payment-intent", {
              price: response.data?.price,
            })

            .then((res) => {
              setClientSecret(res.data.clientSecret);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      });
  }, [axiosSecure, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }


    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log('confirm error')
    } else {
        console.log('payment intent',paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            
            setTransactionId(paymentIntent.id)

            
            const payment = {
                BuyerName: user?.displayName,
                BuyerEmail: user?.email,
                price: course?.price, 
                transactionId: paymentIntent.id,
                date: new Date(),
                courseTitle: course.title,
                courseId: course._id,
                teacherEmail: course.teacherEmail

                
            }

            console.log(payment);

            const res = await axiosSecure.post('/payments', payment)
            console.log('payment saves', res.data)
           

        }

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>PAY NOW : {course?.price} </p>
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
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-500 text-sm">Your transaction ID: {transactionId}</p>
      }
    </form>
  );
};

export default CheckoutForm;
