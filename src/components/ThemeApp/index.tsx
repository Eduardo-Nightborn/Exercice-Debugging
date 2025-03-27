// ContextBug.tsx - Problèmes avec l'utilisation du contexte React
import React, { createContext, useContext, useState, ReactNode } from "react";
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
// Bug 1:
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  // toggleTheme manquant dans la valeur par défaut
  toggleTheme: () => {}, //fixed
} as ThemeContextType);
interface ThemeProviderProps {
  children: ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Bug 2:
  const toggleTheme = () => {
    //isDarkMode = !isDarkMode; // Modification directe de l'état au lieu d'utiliser le
    // setter;
    setIsDarkMode(!isDarkMode); //Fixed -> useState to modify the state
  };
  // Bug 3: FIXED : toggleTheme manquait dans le context
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Composant qui utilise le contexte de thème
const ThemedButton: React.FC = () => {
  // Bug 4: useContext ne fonctionnait pas car le component parent n'etait pas wrapped par le ThemeContext

  const theme = useContext(ThemeContext);

  console.log("THEME IS DARK MODE : ", theme.isDarkMode);
  const buttonStyle = {
    backgroundColor: theme.isDarkMode ? "#333" : "#f0f0f0",
    color: theme.isDarkMode ? "#fff" : "#000",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} onClick={theme.toggleTheme}>
      Toggle Theme
    </button>
  );
};
// Une hiérarchie de composants pour tester le contexte
const Header: React.FC = () => {
  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>My App</h1>
      <ThemedButton />
    </div>
  );
};

const Content: React.FC = () => {
  const theme = useContext(ThemeContext);
  const contentStyle = {
    padding: "2rem",
    backgroundColor: theme.isDarkMode ? "#222" : "#fff",
    color: theme.isDarkMode ? "#fff" : "#000",
    minHeight: "300px",
  };
  return (
    <div style={contentStyle}>
      <h2>Content</h2>
      <p></p>
    </div>
  );
};
export const ThemedApp: React.FC = () => {
  // Bug 5: Component n'etait pas wrapped inside of the provider
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
};
