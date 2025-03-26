// StateBug.tsx - Problèmes de mise à jour d'état et effets
import React, { useState, useEffect } from "react";

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  // Bug 1:
  useEffect(() => {
    setLastUpdated(new Date());
  } ,[]);
  // Bug 2:
  const increment = () => {
    setCount(count + 2);
  };
  return (
    <div>
      <h2>Count: {count}</h2>
      <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
      <button onClick={increment}>Increment twice</button>
    </div>
  );
};
