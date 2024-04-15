import ProductList from "./Product";
import Cart from "./Cart";
import Suggestions from "./Suggestions";
import CartSummary from "./CartSummary";
import { useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://172.31.0.55:8000/",
});

export default function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    client
      .get(`/GetProducts`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }, []);

  function handelAddToCart(productName, quantity) {
    client
      .get(`/AddToCart/${productName}/${quantity}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }

  function removeFromCart(productName) {
    client
      .get(`/RemoveFromCart/${productName}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }

  return (
    <div className="App">
      <ProductCartContainer>
        <ProductList products={products} onAddToCart={handelAddToCart} />
        <Cart products={products} onRemoveFromCart={removeFromCart} />
      </ProductCartContainer>
      <SuggestionsCartSummaryContainer>
        <Suggestions products={products} onAddToCart={handelAddToCart} />
        <CartSummary products={products} />
      </SuggestionsCartSummaryContainer>
    </div>
  );
}

function ProductCartContainer({ children }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "70vh",
          maxWidth: "80%",
          overflow: "hidden",
          margin: "auto",
          justifyContent: "space-evenly",
        }}
      >
        {children}
      </div>
    </>
  );
}

function SuggestionsCartSummaryContainer({ children }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "80%",
          overflow: "hidden",
          margin: "auto",
          justifyContent: "space-evenly",
        }}
      >
        {children}
      </div>
    </>
  );
}
