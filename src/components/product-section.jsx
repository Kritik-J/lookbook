import React, { useEffect, useRef } from "react";
import ProductCard from "./product-card";

export default function ProductSection({ products, selectedProduct }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedProduct && containerRef.current) {
      const selectedElement = containerRef.current.querySelector(
        `[data-product-id="${selectedProduct.id}"]`
      );
      if (selectedElement) {
        const containerWidth = containerRef.current.offsetWidth;
        const elementLeft = selectedElement.offsetLeft;
        const elementWidth = selectedElement.offsetWidth;

        containerRef.current.scrollTo({
          left: elementLeft - containerWidth / 2 + elementWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [selectedProduct]);

  return (
    <div
      ref={containerRef}
      className="z-50 flex gap-4 overflow-x-auto p-4 scrollbar-hide snap-x snap-mandatory bg-black/90"
    >
      {products.map((product) => (
        <div key={product.id} data-product-id={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
