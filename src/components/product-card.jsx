import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 w-[340px] border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="relative w-16 h-20 mr-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 rounded-lg ring-1 ring-black/5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 truncate">
          {product.name}
        </div>
        <div className="text-gray-600 text-sm mt-1 font-medium">
          ${product.price}
        </div>
      </div>
      <button className="ml-3 px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-yellow-400 active:scale-95 transition-all duration-300">
        Shop
      </button>
    </div>
  );
}
