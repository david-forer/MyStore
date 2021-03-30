import React from 'react'
import Rating from './Rating'

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
                        {/* <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-red-500 icon icon-tabler icon-tabler-heart" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            </svg>
                            <p className="ml-2 sm:ml-3 text-xs font-medium leading-3 text-gray-500">141</p>
                        </div> */}
                        <div className="flex items-center text-indigo-700 cursor-pointer">
                            <a className="inline-flex items-center h-8 px-4 m-1 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" href={`/product/${product.id}`}>Read More</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
