import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./Login";
import Users from "./Users";
import Items from "./Items";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/items" element={<Items />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}