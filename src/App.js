import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Exchange from "./pages/Exchange";
import CoinDetails from "./pages/CoinDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coin />} />
        <Route path="/exchanges" element={<Exchange />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="*" element={<div>404! No pages found!</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
