import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderWithLayout from "./components/header/HeaderWithLayout";
import ScreenHome from "./pages/home";
import ScreenProducts from "./pages/products";
import ScreenContact from "./pages/contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HeaderWithLayout />}>
          <Route path="/" element={<ScreenHome />} />
        </Route>
        <Route element={<HeaderWithLayout />}>
          <Route path="/produtos" element={<ScreenProducts />} />
        </Route>
        <Route element={<HeaderWithLayout />}>
          <Route path="/contatos" element={<ScreenContact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
