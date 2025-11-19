import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resources from "./pages/Resources";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/resources" element={<Resources />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
