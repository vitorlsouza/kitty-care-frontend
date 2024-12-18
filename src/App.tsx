import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ReactPixel from 'react-facebook-pixel';

import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupV2 from "./pages/SignupV2.tsx";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentDetail from "./pages/PaymentDetail";
import Progress from "./pages/Progress.tsx";
import Chatroom from "./pages/Chatroom";
import PriceSelection from "./pages/PriceSelection.tsx";
import Profile from "./pages/Profile.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import EmailSentSuccess from "./pages/EmailSentSuccess.tsx";
import SignUpConfirm from "./pages/SignUpConfirm.tsx";
import PaymentMethodV2 from "./pages/PaymentMethodV2.tsx";
import PaymentDetailV2 from "./pages/PaymentDetailV2.tsx";

import PageHead from './components/PageHead';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';

import { useAppDispatch } from "./Redux/hooks";
import { logout, signUpUser } from "./Redux/features/userSlice";
import { isAuthenticated } from "./utils/auth";

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNUP_V2: '/signupV2',
  FORGOT_PASSWORD: '/forgot-password',
  SENT_MAIL: '/sent-mail',
  RESET_PASSWORD: '/reset-password',
  CONFIRM_SIGNUP: '/confirm-signup',
  DASHBOARD: '/dashboard',
  PRICE_SELECTION: '/priceselection',
  PAYMENT_METHOD: '/paymentmethod',
  PAYMENT_METHOD_V2: '/paymentmethodV2',
  PAYMENT_DETAIL: '/paymentdetail',
  PAYMENT_DETAIL_V2: '/paymentdetailV2',
  PROGRESS: '/progress',
  CAT_ASSISTANT: '/cat-assistant',
  CAT_PROFILE: '/cat-profile',
  NOT_FOUND: '/*',
};

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode; }> = React.memo(({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
));

const AppContent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    ReactPixel.init('1245735489886653');

    const checkAuth = () => {
      const auth = isAuthenticated();

      if (!auth) {
        dispatch(logout());
      } else {
        dispatch(signUpUser({
          email: auth?.email,
          first_name: auth?.full_name?.split(" ")[0],
          last_name: auth?.full_name?.split(" ")[1]
        }));
      }
    };

    if (location.pathname === ROUTES.CAT_ASSISTANT) {
      checkAuth();
    }
  }, [location.pathname, dispatch]);

  const routes = [
    { path: ROUTES.HOME, element: import.meta.env.VITE_FLOW_TYPE === "V2" ? <Navigate to={ROUTES.PROGRESS} replace /> : <ProtectedRouteWrapper><Chatroom /></ProtectedRouteWrapper> },
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.SIGNUP, element: <Signup /> },
    { path: ROUTES.SIGNUP_V2, element: <SignupV2 /> },
    { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: ROUTES.SENT_MAIL, element: <EmailSentSuccess /> },
    { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
    { path: ROUTES.CONFIRM_SIGNUP, element: <SignUpConfirm /> },
    { path: ROUTES.DASHBOARD, element: <ProtectedRouteWrapper><Dashboard /></ProtectedRouteWrapper> },
    { path: ROUTES.PRICE_SELECTION, element: <ProtectedRouteWrapper><PriceSelection /></ProtectedRouteWrapper> },
    { path: ROUTES.PAYMENT_METHOD, element: <ProtectedRouteWrapper><PaymentMethod /></ProtectedRouteWrapper> },
    { path: ROUTES.PAYMENT_METHOD_V2, element: <ProtectedRouteWrapper><PaymentMethodV2 /></ProtectedRouteWrapper> },
    { path: ROUTES.PAYMENT_DETAIL, element: <ProtectedRouteWrapper><PaymentDetail /></ProtectedRouteWrapper> },
    { path: ROUTES.PAYMENT_DETAIL_V2, element: <ProtectedRouteWrapper><PaymentDetailV2 /></ProtectedRouteWrapper> },
    { path: ROUTES.PROGRESS, element: import.meta.env.VITE_FLOW_TYPE !== "V2" ? <ProtectedRouteWrapper><Progress /></ProtectedRouteWrapper> : <Progress /> },
    { path: ROUTES.CAT_ASSISTANT, element: <ProtectedRouteWrapper><Chatroom /></ProtectedRouteWrapper> },
    { path: ROUTES.CAT_PROFILE, element: <ProtectedRouteWrapper><Profile /></ProtectedRouteWrapper> },
    { path: ROUTES.NOT_FOUND, element: <ProtectedRouteWrapper><div>Not found</div></ProtectedRouteWrapper> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <PageHead />
      <LoadingOverlay />
      <Router>
        <AppContent />
      </Router>

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
};

export default App;
