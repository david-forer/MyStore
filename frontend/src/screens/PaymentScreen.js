import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingFormContainer from "../components/ShippingFormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <ShippingFormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl mb-16 w-full bg-gray-100 p-4 rounded-lg text-center font-bold">
        Payment Method
      </h1>
      <form onSubmit={submitHandler}>
        <div className="mt-4">
          <span className="text-gray-700 text-xl">Select Method</span>
          <div className="m-4 text-xl">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="PayPal"
                id="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              />
              <span className="ml-2">PayPal  or Credit Card</span>
            </label>
            {/* <label className="inline-flex items-center ml-6">
              <input
               type="radio"
                className="form-radio"
                name="paymentMethod"
                value="Stripe"
                id="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
                
              />
              <span className="ml-2">Stripe</span>
            </label> */}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4"
        >
          Continue
        </button>
      </form>
    </ShippingFormContainer>
  );
};

export default PaymentScreen;
