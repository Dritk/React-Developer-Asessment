import React from "react";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/userdetails";
import UserForm from "./components/userform";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<UserDetails />} />
      <Route path="/add-user" element={<UserForm />} />
    </Routes>
  );
};

export default App;
