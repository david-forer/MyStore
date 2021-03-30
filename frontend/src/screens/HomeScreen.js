import React from "react";
import products from "../products";
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
          
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
          {products.map((product) => (
        <div key={product.id}>
              
              <Product product={product} />
        </div>
      ))}
          </div>
      
    </>
  );
};

export default HomeScreen;
