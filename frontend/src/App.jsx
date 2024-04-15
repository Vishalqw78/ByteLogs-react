import "./styles.css";
import "./styles/tailwind-pre-build.css";
import LivePortal from "./components/LivePortal";
import Homepage from "./components/Homepage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Editor from "./components/Editor";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/write" element={<Editor />} />
          <Route path="/page/:pageNumber" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
