import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-row mb-4 justify-center">
        <div>
        {step1 ? (
      <Link to='/login'>
        <span>Sign In</span>
      </Link>
    ) : (
      <Link disabled className="text-gray-400">Sign In</Link>
    )}
      </div>
      <small class="text-gray-400  font-bold mx-1">{">"}</small>{" "}
        <div>
        {step2 ? (
      <Link to='/shipping'>
        <span>Shipping</span>
      </Link>
    ) : (
      <Link disabled className="text-gray-400">Shipping</Link>
    )}
      </div>
      <small class="text-gray-400 font-bold ml-1 mr-1">{">"}</small>{" "}
        <div>
        {step3 ? (
      <Link to='/payment'>
        <span>Payment</span>
      </Link>
    ) : (
      <Link disabled className="text-gray-400">Payment</Link>
    )}
      </div>
      <small class="text-gray-400  font-bold ml-1 mr-1">{">"}</small>{" "}
        <div>
        {step4 ? (
      <Link to='/placeorder'>
        <span>Place Order</span>
      </Link>
    ) : (
      <Link disabled className="text-gray-400">Place Order</Link>
    )}
        </div>

    </div>
    // <div class="flex flex-row text-xs pt-6 pb-5">
    //   {" "}
    //   <span class="font-bold">Information</span>{" "}
    //   <small class="text-gray-400 ml-1">></small>{" "}
    //   <span class="text-gray-400 ml-1">Shopping</span>{" "}
    //   <small class="text-gray-400 ml-1">></small>{" "}
    //   <span class="text-gray-400 ml-1">Payment</span>{" "}
    // </div>
  );
};

export default CheckoutSteps;
