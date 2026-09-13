import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}