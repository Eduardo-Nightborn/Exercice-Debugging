// EventBug.tsx - Problèmes avec les événements
import React, { useState } from "react";
export const NestedButtons: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };
  const handleParentClick = () => {
    addLog("Parent clicked");
  };
  const handleChildClick = () => {
    addLog("Child clicked");
    // Bug:
  };
  const clearLogs = () => {
    setLogs([])// Bug: Mo
  };
  return (
    <div>
      <div
        onClick={handleParentClick}
        style={{ padding: "20px", background: "#f0f0f0" }}
      >
        Parent
        <button onClick={(e) =>{e.stopPropagation(); handleChildClick()}} style={{ margin: "10px" }}>
          Child
        </button>
      </div>
      <div>
        <h3>Event Logs:</h3>
        <button onClick={clearLogs}>Clear logs</button>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
