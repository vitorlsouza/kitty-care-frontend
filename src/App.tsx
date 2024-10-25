import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cat-assistant" element={<Chatroom />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
