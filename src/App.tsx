import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentDetail from "./pages/PaymentDetail";
import Progress from "./pages/Progess";

// Initialize Stripe with publishable key from environment variables

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/paymentmethod" element={<PaymentMethod />} />
          <Route path="/paymentdetail" element={<PaymentDetail />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
