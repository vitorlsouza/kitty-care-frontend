import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import PageHead from './components/PageHead';
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentDetail from "./pages/PaymentDetail";
import Progress from "./pages/Progress.tsx";
import Chatroom from "./pages/Chatroom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./Redux/hooks";
import { logout, signUpUser } from "./Redux/features/userSlice";
import { isAuthenticated } from "./utils/auth";
import PriceSelection from "./pages/PriceSelection.tsx";
import Profile from "./pages/Profile.tsx";
import ReactPixel from 'react-facebook-pixel';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import EmailSentSuccess from "./pages/EmailSentSuccess.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize Facebook Pixel
    ReactPixel.init('1245735489886653');
    // ReactPixel.pageView();

    // Check authentication status periodically
    const checkAuth = () => {
      const auth = isAuthenticated();

      if (!auth) {
        dispatch(logout());
      }
      else {
        dispatch(signUpUser({ email: auth?.email, first_name: auth?.full_name?.split(" ")[0], last_name: auth?.full_name?.split(" ")[1] }));
      }
    };
    checkAuth();

    const interval = setInterval(checkAuth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <HelmetProvider>
      <PageHead />
      <LoadingOverlay />
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Chatroom />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sent-mail" element={<EmailSentSuccess />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
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
          <Route path="/cat-profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <ProtectedRoute>
              <div>Not found</div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-P9FML3PS"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </HelmetProvider>
  );
}

export default App;
