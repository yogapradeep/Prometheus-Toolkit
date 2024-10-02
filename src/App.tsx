import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";
import { GroupServicesProvider } from "./components/context/groupsServicesContext";

function App() {
  return (
    <div className="App">
      <GroupServicesProvider>
        <Dashboard />
      </GroupServicesProvider>
    </div>
  );
}

export default App;
