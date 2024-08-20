import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Product from './Components/Product';
import { ProductProvider } from './Components/ProductContext'

function App() {
    return (
        <Router>
            <ProductProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </ProductProvider>
        </Router>
    );
}

export default App;
