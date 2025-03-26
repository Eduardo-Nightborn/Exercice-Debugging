// ConditionalRenderBug.tsx - Problèmes de rendu conditionnel
import React, { useState } from "react";
export const ProductList: React.FC = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", available: true },
    { id: 2, name: "Phone", available: false },
    { id: 3, name: "Tablet", available: true },
  ]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  // Bug:
  const filteredProducts = showOnlyAvailable
    ? products.filter((p) => p.available)
    : products;
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showOnlyAvailable}
          onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
        />
        Show only available products
      </label>
      <ul>
        {filteredProducts.map((product) => (
          // Bug:
          <li className={product.available ? 'in-stock' : 'out-of-stock'}>
            {product.name} {product.available && "(Available)"}
          </li>
        ))}
      </ul>
    </div>
  );
};
