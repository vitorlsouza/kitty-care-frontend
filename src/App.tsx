import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentDetail from "./pages/PaymentDetail";
import Progress from "./pages/Progess";
import Chatroom from "./pages/Chatroom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./Redux/hooks";
import { logout } from "./Redux/features/userSlice";
import { isAuthenticated } from "./utils/auth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check authentication status periodically
    const checkAuth = () => {
      if (!isAuthenticated()) {
        dispatch(logout());
      }
    };

    const interval = setInterval(checkAuth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/paymentmethod" element={
            <ProtectedRoute>
              <PaymentMethod />
            </ProtectedRoute>
          } />
          <Route path="/paymentdetail" element={
            <ProtectedRoute>
              <PaymentDetail />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
          <Route path="/cat-assistant" element={
            <ProtectedRoute>
              <Chatroom />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
