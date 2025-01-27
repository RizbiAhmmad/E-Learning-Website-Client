import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateway_PK)
const Payment = () => {
    return (
        <div className='p-6'>
            <div>
                <h2 className='text-center font-bold mb-4'>Make Payment</h2>
            </div>
            <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
        </div>
    );
};

export default Payment;