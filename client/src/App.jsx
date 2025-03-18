import { Routes, Route } from "react-router-dom";
import { HeaderProvider  } from "./context/HeaderContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProductDetailsPage from "./pages/ShopPage/ProductDetailsPage";
import SearchPage from "./pages/ShopPage/SearchPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminAddProductPage from "./pages/AdminPage/AdminAddProductPage";
import AdminEditProductPage from "./pages/AdminPage/AdminEditProductPage";
import "./index.css";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderProvider>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        
          <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
            <Route path="/admin/add-product" element={<ProtectedRoute element={<AdminAddProductPage />} />} />
            <Route path="/admin/edit-product/:id" element={<ProtectedRoute element={<AdminEditProductPage />} />} />
          </Routes>
      </main>
      <Footer />
      </HeaderProvider>
    </div>
  );
}

export default App;
