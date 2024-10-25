import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat-assistant" element={<Chatroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
