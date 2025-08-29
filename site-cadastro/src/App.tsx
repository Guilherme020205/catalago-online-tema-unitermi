import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import HeaderWithLayout from "./components/header/HeaderWithLayout";

import ScreenLogin from "./pages/login";
import ScreenHome from "./pages/home";
import ScreenCategorys from "./pages/Categorys";
import ScreenCorLine from "./pages/CorLine";
import ScreenProduct from "./pages/Product";
import ScreenProductCapacity from "./pages/ProductCapacity";
import ScreenProductLines from "./pages/ProductLines/index";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<HeaderWithLayout />}>
            <Route path="/" element={<ScreenLogin />} />
          </Route>
          <Route element={<HeaderWithLayout />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <ScreenHome />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<HeaderWithLayout />}>
            <Route
              path="/categorys"
              element={
                <ProtectedRoute>
                  <ScreenCategorys />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<HeaderWithLayout />}>
            <Route
              path="/corLine"
              element={
                <ProtectedRoute>
                  <ScreenCorLine />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<HeaderWithLayout />}>
            <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <ScreenProduct />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<HeaderWithLayout />}>
            <Route
              path="/productCapacity"
              element={
                <ProtectedRoute>
                  <ScreenProductCapacity />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<HeaderWithLayout />}>
            <Route
              path="/productLines"
              element={
                <ProtectedRoute>
                  <ScreenProductLines />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
