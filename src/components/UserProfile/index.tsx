// BuggyComponent.tsx - Contient plusieurs erreurs de syntaxe et de type
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string; // Erreur
}
export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  });

  const updateEmail = (newEmail: string) => {
    // Erreur:

    setUser({ ...user, email: newEmail }); // Erreur:
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => updateEmail("new@example.com")}>
        Changer Email
      </button>
    </div>
  );
};
