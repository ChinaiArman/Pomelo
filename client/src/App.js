import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Nav from "./components/Nav.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="header">
        <Nav />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
