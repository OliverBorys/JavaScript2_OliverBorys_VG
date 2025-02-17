import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProductDetailsPage from "./pages/ShopPage/ProductDetailsPage";
import SearchPage from "./pages/ShopPage/SearchPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import TeamPage from "./pages/AboutPage/TeamPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminAddProductPage from "./pages/AdminPage/AdminAddProductPage";
import AdminEditProductPage from "./pages/AdminPage/AdminEditProductPage";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product-details" element={<ProductDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/admin/add-product"
              element={<AdminAddProductPage />}
            />
            <Route
              path="/admin/edit-product"
              element={<AdminEditProductPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;