import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScreenLogin from "./pages/login";
import ScreenHome from "./pages/home";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ScreenLogin />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ScreenHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
