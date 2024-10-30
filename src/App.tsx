import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentDetail from "./pages/PaymentDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const options = {
    // You'll need to pass the client secret obtained from your backend
    clientSecret: import.meta.env.VITE_STRIPE_SECRET_KEY,
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/paymentmethod" element={<PaymentMethod />} />
          <Route
            path="/paymentdetail"
            element={
              <Elements stripe={stripePromise}> {/* // options={options} */}
                <PaymentDetail />
              </Elements>
            }
          />
          {/* <Route path="/cat-assistant" element={<Chatroom />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
