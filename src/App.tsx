import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GroupServicesProvider } from "./components/context/groupsServicesContext";
import Dashboard from "./components/dashboard";
import { Analytics } from "@vercel/analytics/react";

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
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
