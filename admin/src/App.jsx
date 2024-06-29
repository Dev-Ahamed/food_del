import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "../src/pages/Add/Add";
import List from "../src/pages/List/List";
import Orders from "../src/pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const serverURL = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add serverURL={serverURL} />} />
          <Route path="/list" element={<List serverURL={serverURL} />} />
          <Route path="/orders" element={<Orders serverURL={serverURL} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
