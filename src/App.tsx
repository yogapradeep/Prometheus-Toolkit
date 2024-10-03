import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";
import { GroupServicesProvider } from "./components/context/groupsServicesContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GroupServicesProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </GroupServicesProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
