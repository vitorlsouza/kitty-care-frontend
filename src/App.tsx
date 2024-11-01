import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { loginUserAsync, logout } from "./Redux/features/userSlice";
import { isAuthenticated, setAuthToken } from "./utils/auth";
import PriceSelection from "./pages/PriceSelection.tsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Handle OAuth callback
    const handleOAuthCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('access_token');
      const error = params.get('error');

      if (token) {
        // Store the token
        setAuthToken({
          token,
          expiresIn: '1d' // You might want to get this from the response
        });

        // Update Redux state with required LoginState properties
        dispatch(loginUserAsync.fulfilled(
          { token },
          'login/fulfilled',
          { email: '', password: '' } // Provide the required LoginState properties
        ));

        // Redirect to dashboard
        navigate('/dashboard');
      } else if (error) {
        navigate('/login', {
          state: { error: 'Google login failed. Please try again.' }
        });
      }
    };

    // Check if this is an OAuth callback
    if (location.pathname === '/callback/google') {
      handleOAuthCallback();
    }
  }, [location, navigate, dispatch]);

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
          <Route path="/priceselection" element={
            <ProtectedRoute>
              <PriceSelection />
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
          <Route path="/callback/google" element={<div>Processing login...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
