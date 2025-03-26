// AsyncBug.tsx - Problèmes avec les appels API et données asynchrones
import React, { useState, useEffect } from "react";
interface User {
  id: number;
  name: string;
  email: string;
}
export const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Simule un appel API
  const fetchUsers = async (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      console.log("FETCH USERS");
      setTimeout(() => {
        // Randomly succeed or fail to simulate real API
        if (Math.random() > 0.3) {
          resolve([
            { id: 1, name: "Alice", email: "alice@example.com" },
            { id: 2, name: "Bob", email: "bob@example.com" },
            { id: 3, name: "Charlie", email: "charlie@example.com" },
          ]);
        } else {
          reject(new Error("Failed to fetch users"));
        }
      }, 1000);
    });
  };

  // Bug 1:
  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        // Oubli de gérer l'erreur correctement
        console.log("Erreur lors du chargement de la page : ", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Bug 2:
  const firstUserEmail =
    users.length > 0 ? users[0].email : "No users available";

  // Bug 3:
  const deleteUser = (userId: number) => {
    // Suppression incorrecte qui ne déclenche pas de re-render
    const usersAfterDelete = users.filter((user) => user.id !== userId);
    setUsers(usersAfterDelete);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users</h2>
      {error !== null ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <>
          <p>First user email: {firstUserEmail}</p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
