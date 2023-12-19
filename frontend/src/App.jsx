import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:_id" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
