import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import UserDetails from "./pages/userdetails";
import UserForm from "./pages/userform";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<UserDetails />} />
      <Route path="/add-user" element={<UserForm />} />
      <Route path="/edit-user/:id" element={<UserForm />} />
    </Routes>
  );
};

export default App;
