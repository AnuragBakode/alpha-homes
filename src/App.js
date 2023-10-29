import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Ngo from "./pages/Ngo";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ngo" element={<Ngo />} />
      </Routes>
    </div>
  );
}

export default App;
