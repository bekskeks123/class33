import './App.css';
import ProductCatalog from './components/ProductCatalog';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <ProductCatalog />
    </ProductProvider>
  );
}

export default App;