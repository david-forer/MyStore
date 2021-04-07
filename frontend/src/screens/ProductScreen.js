import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
// import { Link } from "react-router-dom";
// import Rating from '../components/Rating';
// import products from "../products";
// import axios from 'axios'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      {loading ? (
        <h2 className="m-20">
          <Loader />
        </h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="mx-auto container px-4 xl:px-0 py-10 xl:py-40">
          <div className>
            <div className="flex flex-wrap items-center">
              <div className="lg:w-2/5 w-full ">
                <img
                  className="w-full"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="lg:w-3/5 w-full">
                <div className="lg:pl-8 py-2 text-color">
                  <h1 className="text-3xl xl:text-6xl leading-snug f-f-l font-black">
                    {product.name}
                  </h1>
                  <h2 className="text-xl lg:text-3xl leading-7 lg:leading-10 f-f-r py-4 lg:py-8">
                    {product.description}
                  </h2>
                  <div className="flex items-center">
                    <div className="flex flex-wrap sm:flex-no-wrap items-center justify-between w-full">
                      <div className="w-1/4 sm:w-1/4 h-24 rounded-t sm:rounded-l sm:rounded-t-none shadow bg-white dark:bg-gray-800 text-center p-8">
                        <span className="text-xl text-indigo-700 font-bold mr-4">
                          price:{" "}
                        </span>
                        <span className="text-xl">{product.price}</span>
                      </div>
                      <div className="w-full sm:w-1/4 h-24 shadow bg-white dark:bg-gray-800 text-center px-2 py-8">
                        <span className="text-xl text-indigo-700 font-bold mr-2">
                          status:{" "}
                        </span>
                        <span className="text-lg">
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>
                      <div className="w-full sm:w-1/4 h-24 rounded-t sm:rounded-l sm:rounded-t-none shadow bg-white dark:bg-gray-800 text-center px-4 py-2">
                        {product.countInStock > 0 && (
                          <>
                            <span className="mr-4 text-indigo-700 font-bold">
                              QTY
                            </span>
                                <select
                                  className="form-select block w-full mt-1 bg-indigo-700 rounded text-white p-2"
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </>
                        )}
                      </div>
                      <div className="w-full sm:w-1/4 h-24 rounded-b sm:rounded-b-none shadow bg-white dark:bg-gray-800 text-center p-4">
                        <button
                          onClick={addToCartHandler}
                          className="f-m-m md:text-xl text-base rounded font-normal text-white bg-indigo-700 md:py-4 md:px-4 px-2 py-4 foucus:outline-none leading-4 hover:opacity-90"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
