import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import "../App.css";
import { TrashIcon } from "@heroicons/react/solid";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log("remove");
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <div>
        <h1 className="p-6 bg-gray-100 rounded text-2xl text-center mb-4 font-bold">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>Your Cart is Empty</Message>
        ) : (
          <table className=" text-gray-700 w-full text-sm lg:text-base cellspacing=0">
            <thead>
              <tr>
                <th className=""></th>
                <th className="">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product}>
                  <td className="content-end">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 rounded ml-4"
                    />
                  </td>
                  <td>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <select
                      className="form-select block w-full mt-1 bg-indigo-500 rounded text-white p-2"
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <TrashIcon className="h-8 w-8 text-indigo-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-end">
        <div className="lg:px-2 w-1/2 mt-6 ">
          <div className="p-4 bg-gray-100 rounded">
            <h1 className="ml-2 font-bold uppercase text-center">Order Details</h1>
          </div>
          <div className="p-4">
            <p className="mb-6 italic">
              Shipping costs are calculated based on address you have entered
            </p>
            <div className="flex justify-between border-b">
              <div className="lg:px-4 lg:py-2 m-2 text-md  font-bold text-center text-gray-800">
                Subtotal
              </div>
              <div className="lg:px-4 lg:py-2 m-2 text-md font-bold text-center text-gray-900">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
              </div>
            </div>

            <div className="flex justify-between pt-4 border-b">
              <div className="lg:px-4 lg:py-2 m-2 text-md font-bold text-center text-gray-800">
                Tax
              </div>
              <div className="lg:px-4 lg:py-2 m-2 text-md font-bold text-center text-gray-900">
                Not applicable
              </div>
            </div>
            <div className="flex justify-between pt-4 border-b">
              <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                Total
              </div>
              <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>

            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-indigo-500 rounded-full shadow item-center hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
            >
              <span class="ml-2 mt-5px">Procceed to checkout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
