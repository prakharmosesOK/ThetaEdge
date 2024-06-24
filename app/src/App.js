import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Market from './components/Market.jsx';
import AboutUs from './components/AboutUs.jsx';
import NFTticket from './components/NFTticket.jsx';

// Importing styles
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/market' element={<Market />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/market/:ticketId' element={<NFTticket />} />
      </Routes>
    </BrowserRouter>
  );
}