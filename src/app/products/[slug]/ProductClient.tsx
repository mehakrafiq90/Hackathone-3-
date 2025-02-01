'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/Product';
import { urlFor } from '@/sanity/lib/image';
import { useCart } from '@/context/CartContext';

interface ProductClientProps {
  product: Product;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: quantity,
        slug: product.slug,
        dimensions: product.dimensions,
        features: product.features,
        category: product.category,
        _createdAt: product._createdAt,
        _updatedAt: product._updatedAt
      }
    });
  };

  const imageUrl = product.image && product.image.asset 
    ? urlFor(product.image.asset).url() 
    : '';

  console.log('Product:', product);
  console.log('Generated Image URL:', imageUrl);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="max-w-6xl w-full bg-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">{product.name}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {imageUrl && (
              <div className="relative h-96">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex mt-4 gap-2 justify-center">
              {[1, 2, 3].map((index) => (
                <div key={index} className="relative w-1/3 h-24 cursor-pointer">
                  <Image
                    src={imageUrl}
                    alt={`${product.name} Thumbnail ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between text-black">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-lg mb-6">{product.description}</p>
              <h3 className="text-xl font-medium mb-2">Dimensions</h3>
              <ul className="list-disc list-inside text-lg mb-6">
                <li>Height: {product.dimensions.height} cm</li>
                <li>Width: {product.dimensions.width} cm</li>
                <li>Depth: {product.dimensions.depth} cm</li>
              </ul>
              <h3 className="text-xl font-medium mb-2">Features</h3>
              <ul className="list-disc list-inside text-lg mb-6">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-3xl font-bold mb-4">Price: £{product.price}</p>
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-l-lg"
                >
                  -
                </button>
                <input 
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center text-xl font-semibold border-t border-b"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-r-lg"
                >
                  +
                </button>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={addToCart}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
                >
                  Add to Cart
                </button>
                <button className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;