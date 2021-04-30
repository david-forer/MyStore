import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import Loader from "../components/Loader";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    if (!userInfo) {
      history.push("/login");
    }
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

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div className="grid grid-cols-2 mt-12">
        <section>
          <h2 className="text-2xl lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-black to-purple-200 font-bold mb-12">SHIPPING</h2>
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
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Delivered on: {order.deliveredAt}
              </div>
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
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Paid on: {order.paidAt}
              </div>
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
        <section className="container mx-auto px-10">
          <h2 className="text-2xl lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-black to-purple-200 font-bold mb-12">ORDER SUMMARY</h2>
          <div className="flex justify-between items-center p-6 text-lg leading-4 text-gray-500  lg:px-12">
            <h4 class="m-0 text-gray-500">Items</h4>

            <div class="text-center">${order.itemsPrice}</div>
              </div>
              <div className="flex justify-between items-center p-6 text-lg leading-4 text-gray-500  lg:px-12">
            <h4 class="m-0 text-gray-500">Shipping</h4>

            <div class="text-center">${order.shippingPrice}</div>
              </div>
              <div className="flex justify-between items-center p-6 text-lg leading-4 text-gray-500  lg:px-12">
            <h4 class="m-0 text-gray-500">Tax</h4>

            <div class="text-center">${order.taxPrice}</div>
          </div>
          <div className="flex justify-between items-center p-6 text-lg leading-4 text-gray-800 lg:px-12 font-bold">
            <h4 class="m-0 text-gray-800">Total</h4>

            <div class="text-center">${order.totalPrice}</div>
          </div>

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
          </div>

          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <div>
              <button
                className="flex justify-center w-3/4 px-10 py-3 mt-6 font-medium text-white uppercase bg-indigo-500  shadow item-center hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
                onClick={deliverHandler}
              >
                <span class="ml-2 mt-5px">Mark as Delivered</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default OrderScreen;
