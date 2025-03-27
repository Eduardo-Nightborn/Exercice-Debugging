// HooksBug.tsx - Problèmes avec l'utilisation des custom hooks
import React, { useState, useEffect, useRef } from "react";

// Custom hook pour gérer un compteur
const useCounter = (initialValue: number = 0, step: number = 1) => {
  // Bug 1: Utilisation correcte de useState au lieu d'une variable locale pour que les changements d'état déclenchent un re-rendu
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    setCount(prevCount => prevCount + step);
  };
  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };
  const reset = () => {
    setCount(initialValue);
  };
  return { count, increment, decrement, reset, setCount };
};

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state with localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]); // Re-run effect when key or storedValue changes

  return [storedValue, setStoredValue];
}

export default useLocalStorage;

// Composant qui utilise les hooks
export const CounterApp: React.FC = () => {
  // Bug 4: Plus de bug ici car useCounter utilise maintenant useState correctement (voir Bug 1)
  const counter = useCounter();
  // Bug 5: Plus de bug ici car useLocalStorage est bien implémenté et exporté par défaut, utilisable tel quel
  const [savedCount, setSavedCount] = useLocalStorage<number>("savedCount", 0);
  // Référence pour suivre le nombre de renders
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });

  const handleSave = () => {
    setSavedCount(counter.count);
  };
  const handleLoad = () => {
    // Bug 6: Correction - Puisque setCount est maintenant exposé par useCounter, on peut l'utiliser directement pour définir count à savedCount, ce qui est plus propre et efficace que d'utiliser increment/decrement
    counter.setCount(savedCount);
  };
  
  return (
    <div>
      <h2>Counter App</h2>
      <div>
        <p>Current count: {counter.count}</p>
        <button onClick={counter.increment}>Increment</button>
        <button onClick={counter.decrement}>Decrement</button>
        <button onClick={counter.reset}>Reset</button>
      </div>
      <div>
        <p>Saved count: {savedCount}</p>
        <button onClick={handleSave}>Save current count</button>
        <button onClick={handleLoad}>Load saved count</button>
      </div>
      <p>This component has rendered {renderCount.current} times.</p>
    </div>
  );
};