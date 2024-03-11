import Header from './pages/Header.js';
import Footer from './pages/Footer.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
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
