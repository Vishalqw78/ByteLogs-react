import "./styles.css";
import "./styles/tailwind-pre-build.css";
import Homepage from "./components/Homepage";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Editor from "./components/Editor";
import Login from "./components/Login";
import Register from "./components/Register";
import Congratulations from "./components/Congrats";

export default function App() {
  const userToken = localStorage.getItem('token');
  const ProtectedRoute = ({ children }) => {
    if (!userToken) {
      return <Navigate to="/signin" />;
    }

    return children
  };
  const AuthRoute = ({ children }) => {
    if (userToken) {
      return <Navigate to="/"/>;
    }
    else{
      return children;
    }
  };
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/write" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
          <Route path="/signin" element={<AuthRoute><Login/></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Register/></AuthRoute>} />
          <Route path="/page/:pageNumber" element={<Homepage />} />
          <Route path="/verification" element={<Congratulations />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
