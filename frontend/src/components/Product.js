import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'



const Product = ({product}) => {
    return (
        <div>
            
            <div className="max-w-xl rounded bg-white shadow overflow-hidden p-6 sm:flex items-stretch h-96">
                <div className="w-1/2 mr-4">
                    <img className="sm:mr-6 mb-12 sm:mb-6 flex-shrink-0 w-full sm:w-auto object-cover " src={product.image} alt={product.name} />
                    
                    <h3><Rating value={product.rating} text={`on ${product.numReviews} reviews` }/></h3>
                    <h3 className="mt-4 text-blue-800 text-xl">${ product.price}</h3>
                </div>
                <div className="flex flex-col justify-between w-1/2">
                    <h4 className="text-xl font-semibold leading-5 text-gray-800">{ product.name}</h4>
                    <p className="mt-4 text-sm leading-tight text-gray-800">{ product.description}</p>
                    <div className="mt-8 flex justify-between items-center">
                        
                        <div className="flex items-center text-indigo-700 cursor-pointer">
                            <Link to={`/product/${product._id}`} className="inline-flex items-center h-8 px-4 m-1 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" >Read More</Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
