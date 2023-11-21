import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPages/Index";
import AdminPage from "./components/AdminPages/Index";
import CartPage from "./components/UserPages/Cart";
import CheckoutPage from "./components/UserPages/Checkout";

function App() {
  return (
    <div>
      <BrowserView>
        <Router>
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </Router>
      </BrowserView>
      <MobileView>
        <h1> Not Rendered on Mobile, Please check via Desktop/PC. </h1>
      </MobileView>
    </div>
  );
}

export default App;
