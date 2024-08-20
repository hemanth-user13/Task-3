import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'; 
import Product from './Components/Product'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} /> 
            </Routes>
        </Router>
    );
}

export default App;
