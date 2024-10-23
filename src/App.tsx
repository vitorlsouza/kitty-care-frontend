import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatroom from "./pages/Chatroom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/cat-assistant" element={<Chatroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
