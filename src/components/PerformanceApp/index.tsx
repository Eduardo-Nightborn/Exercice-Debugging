// PerformanceBug.tsx - Problèmes de performance et re-renders excessifs
import React, { useState, useCallback, memo } from "react";

// Composant qui re-rend inutilement
const ExpensiveComponent: React.FC<{
  data: number[];
  onItemClick: (item: number) => void;
}> = memo((props) => {
  console.log("ExpensiveComponent rendering");
  
  // Bug:
  const processedData = props.data.map((item) => item * 2);

  return (
    <div>
      <h3>Processed Data</h3>
      <ul>
        {processedData.map((item, index) => (
          <li key={index} onClick={() => props.onItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export const PerformanceApp: React.FC = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<number[]>([1, 2, 3, 4, 5]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  console.log("PerformanceApp rendering");

  // Bug:
  const handleItemClick = useCallback(
    (item: number) => {
      setSelectedItem(item);
    },
    [data]
  );

  const addItem = () => {
    setData([...data, Math.floor(Math.random() * 100)]);
  };

  return (
    <div>
      <div>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div>
        <h2>Selected Item: {selectedItem !== null ? selectedItem : "None"}</h2>
        <button onClick={addItem}>Add Random Item</button>
      </div>

      {/* Bug: */}
      <ExpensiveComponent data={data} onItemClick={handleItemClick} />
    </div>
  );
};
