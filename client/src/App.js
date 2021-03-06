import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "font-awesome/css/font-awesome.min.css";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Product/Product";
import Register from "./pages/Registeration/Register";
import { useContext } from "react";
import Login from "./pages/Registeration/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import ProductsControl from "./Admin/ProductsControl/ProductsControl";

import Cart from "./pages/Cart/Cart";

function App() {
  axios.defaults.withCredentials = true;
  const { loggedIn, user } = useContext(AuthContext);
  return (
    <CartContextProvider>
      <Router>
        <Header />
        <main>
          <Route path="/" component={Home} exact />
          <Route path="/shop" component={Shop} />
          <Route path="/categories" component={Categories} />
          <Route path="/products/:slug" component={Product} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          {loggedIn && (
            <>
              <Route path="/cart/:id?" component={Cart} />
              {user.role == "admin" && (
                <Route path="/admin/products" component={ProductsControl} />
              )}
            </>
          )}
        </main>
        <Footer />
      </Router>
    </CartContextProvider>
  );
}

export default App;
