import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './routes/root';
import Product from './routes/product';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';

function App() {
  return (
    <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/product">
            <Route path="/product/:productId" element={<Product />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
