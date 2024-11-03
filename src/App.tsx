import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentDetail from "./pages/PaymentDetail";
import Progress from "./pages/Progess";
import Chatroom from "./pages/Chatroom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./Redux/hooks";
import { logout, signUpUser } from "./Redux/features/userSlice";
import { isAuthenticated } from "./utils/auth";
import PriceSelection from "./pages/PriceSelection.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check authentication status periodically
    const checkAuth = () => {
      const auth = isAuthenticated();
      console.log(auth);
      
      if (!auth) {
        dispatch(logout());
      }
      else {
        dispatch(signUpUser({email: auth.email, first_name: auth.full_name.split(" ")[0], last_name: auth.full_name.split(" ")[1]}));
      }
    };
    checkAuth();

    const interval = setInterval(checkAuth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
