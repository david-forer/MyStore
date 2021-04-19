import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

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
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

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
              <message>Delivered on: {order.deliveredAt}</message>
            ) : (
              <message className="text-red-800 bg-red-300 px-6 py-2 ">
                Not Delivered
              </message>
            )}
          </div>
          <hr className="mt-4" />
          <h2 className="my-4">PAYMENT METHOD</h2>
          <div >
            {/* Payment Method */}
            <p className="mb-4">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <message>Paid on: {order.paidAt}</message>
            ) : (
              <message className="text-red-800 bg-red-300 px-6 py-2 ">
                Not Paid
              </message>
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
