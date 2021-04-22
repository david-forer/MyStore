import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import Loader from "../components/Loader";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div className="grid grid-cols-2 mt-12">
        <section>
          <h2 className="mb-4">SHIPPING</h2>
          <p>
            <strong>Name:</strong> {order.user.name}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </p>
          <div className="mt-4">
            <strong>Address:</strong>
            <p className="mb-4">
              {order.shippingAddress.address},{order.shippingAddress.city},
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message>Delivered on: {order.deliveredAt}</Message>
            ) : (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Not Delivered!</strong>
              </div>
            )}
          </div>
          <hr className="mt-4" />
          <h2 className="my-4">PAYMENT METHOD</h2>
          <div>
            {/* Payment Method */}
            <p className="mb-4">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message>Paid on: {order.paidAt}</Message>
            ) : (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Not Paid!</strong>
              </div>
            )}
          </div>
          <hr className="mt-4" />
          <h2 className="my-4">ORDER ITEMS</h2>
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div>
              <table>
                {order.orderItems.map((item, index) => (
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
                      <span className="mr-9 ">Items</span>
                      <span className="justify-end">${order.itemsPrice}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mr-6">Shipping</span>$
                      {order.shippingPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mr-12">Tax</span>${order.taxPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="mr-12">Total</span>${order.totalPrice}
                    </td>
                  </tr>
                </tr>
              </tbody>
            </table>

            <div>
              {!order.isPaid && (
                <div>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {/* <button
                className="inline-flex items-center justify-center px-12 py-1 text-sm font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 "
                disabled={order.cartItems === 0}
                type="button"
                onClick={placeOrderHandler}
              >
                Place Order
              </button> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderScreen;
