import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
// import Loader from "../components/Loader";

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // calculate totals
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
  
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate
  
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line 
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
   }))
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <hr className="max-w-4xl mx-auto text-center border-black mb-20"/>

      <div className="grid grid-cols-2 mt-12">
        <section>
          <h2 className="mb-4">SHIPPING</h2>
          <div>
            {cart.shippingAddress.address},{cart.shippingAddress.city},
            {cart.shippingAddress.postalCode}
          </div>
          <hr />
          <h2 className="my-4">PAYMENT METHOD</h2>
          <div>
            {/* Payment Method */}
            <strong>Method: </strong>
            {cart.paymentMethod}
          </div>
          <hr />
          <h2 className="my-4">ORDER ITEMS</h2>
          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <div>
              <table>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 rounded ml-4"
                      />
                    </td>
                    <td className="text-sm">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="text-sm">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </section>
        <section className="mb-6 ml-12 border border-green-800 flex-col  justify-center">
          <h2 className="mb-4 ml-2">ORDER SUMMARY</h2>
          <div>
            <table className="mb-6  border border-green-800">
              <tbody className="table-fixed">
                <tr className="">
                  <tr>
                    <td>
                      <span className="mr-9 ">Items</span><span className="justify-end">${cart.itemsPrice}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mr-6">Shipping</span>${cart.shippingPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mr-12">Tax</span>${cart.taxPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mr-12">Total</span>${cart.totalPrice}
                    </td>
                  </tr>
                </tr>
              </tbody>
            </table>
            {error && <message>{error}</message>}
            <div>
              <button
                className="inline-flex items-center justify-center px-12 py-1 text-sm font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 "
                disabled={cart.cartItems === 0}
                type="button"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
