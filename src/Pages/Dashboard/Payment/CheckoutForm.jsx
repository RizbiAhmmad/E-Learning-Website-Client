import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';


const CheckoutForm = () => {

    const [error, setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user}= useAuth()


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

         // confirm payment
        //  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: card,
        //         billing_details: {
        //             email: user?.email || 'anonymous',
        //             name: user?.displayName || 'anonymous'
        //         }
        //     }
        // })
        
        // if (confirmError) {
        //     console.log('confirm error')
        // }
        // else {
        //     console.log('payment intent', paymentIntent)
        // }

    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe }>
                Pay
            </button>
            <p className="text-red-600">{error}</p>


        </form>
    );
};

export default CheckoutForm;