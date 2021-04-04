import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import Rating from '../components/Rating';
// import products from "../products";
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      
      setProduct(data)
    }
    fetchProduct()
  }, [match])


  // const product = products.find((p) => p._id === match.params.id);
  // console.log(product);
  return (
    <>
      <div className="mx-auto container px-4 xl:px-0 py-10 xl:py-40">
        <div className>
          <div className="flex flex-wrap items-center">
            <div className="lg:w-2/5 w-full ">
              <img className="w-full" src={product.image} alt={product.name} />
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
                    <div className="w-full sm:w-1/3 h-24 rounded-t sm:rounded-l sm:rounded-t-none shadow bg-white dark:bg-gray-800 text-center p-8">
                      <span className="text-xl text-indigo-700 font-bold mr-4">
                        price:{" "}
                      </span>
                      <span className="text-xl">{product.price}</span>
                    </div>
                    <div className="w-full sm:w-1/3 h-24 shadow bg-white dark:bg-gray-800 text-center p-8">
                      <span className="text-xl text-indigo-700 font-bold mr-4">
                        status:{" "}
                      </span>
                      <span className="text-xl">
                        {product.countInStock > 0
                          ? "  In Stock"
                          : "  Out of Stock"}
                      </span>
                    </div>
                    <div className="w-full sm:w-1/3 h-24 rounded-b sm:rounded-b-none shadow bg-white dark:bg-gray-800 text-center p-4">
                      <button
                        className="f-m-m md:text-2xl text-base rounded font-normal text-white bg-indigo-700 md:py-2 md:px-8 px-2 py-2 foucus:outline-none leading-4 hover:opacity-90"
                        type="button"
                        disabled={product.countInStock === 0 }
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
    </>
  );
};

export default ProductScreen;
