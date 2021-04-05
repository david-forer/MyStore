import React, { useEffect } from "react";
// import products from "../products";
import Product from "../components/Product";
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()
  
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  

  return (
    <>
      <h1 className="text-2xl font-bold text-indigo-700 m-4">
        Our Latest Products:
      </h1>
      
      {loading ? <h2 className="m-20"><Loader /></h2> : error ? <h3>{ error}</h3> :  <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
        {products.map((product) => (
          <div key={product.id} className="">
            <Product product={product} />
          </div>
        ))}
      </div>}
     
    </>
  );
};

export default HomeScreen;
