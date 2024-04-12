import { useState } from "react";

export default function Suggestions({ products, onAddToCart }) {
  const suggestedProduct = Object.keys(products).filter(
    (productname) => products[productname].suggested
  );

  return (
    <>
      <div
        className="section"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          height: "250px",
          flex: "0 0 60%",
        }}
      >
        <h2 style={{ marginTop: "0px", marginBottom: "15px" }}>Suggestions</h2>
        <div
          className="suggestions"
          style={{
            display: "flex",
            alignContent: "start",
            gap: "20px",
          }}
        >
          {suggestedProduct.length ? (
            suggestedProduct.map((productname) => (
              <SuggestionsProduct
                product={products[productname]}
                onAddToCart={onAddToCart}
                key={productname}
              />
            ))
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <h1
                style={{
                  color: "#999",
                  fontSize: "35px",
                  display: "inline-block",
                  marginTop: "50px",
                }}
              >
                No Suggestions
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SuggestionsProduct({ product, onAddToCart }) {
  const [counter, setCounter] = useState(product.quantity);

  //increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  //decrease counter
  const decrease = () => {
    setCounter((count) => (count > 0 ? count - 1 : 0));
  };

  return (
    <>
      <div
        className="product-card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          minWidth: "800px",
          marginBottom: "10px",
        }}
      >
        {/* Name and Description Section */}
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <h3 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            {product.name}
          </h3>
          <p style={{ fontSize: "1em", marginBottom: "10px" }}>
            {product.description}
          </p>
        </div>
        {/* Photo Section */}
        <div style={{ flex: 1, paddingRight: "50px" }}>
          <img
            src={`/images/${product.name}.jpg`}
            alt="product_image"
            width={200}
            height={150}
            style={{ width: "200px", height: "150px", objectFit: "cover" }}
          />
        </div>
        {/* Quantity and Counter Section */}
        <div style={{ flex: 1, paddingRight: "0px" }}>
          <label
            htmlFor="quantity"
            style={{ fontSize: "1.5em", marginBottom: "10px" }}
          >
            Quantity
          </label>
          <div
            className="counter"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span
              className="down"
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={decrease}
            >
              -
            </span>
            <input
              type="text"
              style={{ width: "50px", textAlign: "center", fontSize: "1.2em" }}
              value={counter}
              onChange={(e) => setCounter(Number(e.target.value))}
            />
            <span
              className="up"
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={increase}
            >
              +
            </span>
          </div>
        </div>
        {/* Price and Add to Cart Button Section */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            $ {(product.price * counter).toFixed(2)}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              fontSize: "1.2em",
              cursor: "pointer",
            }}
            onClick={() => onAddToCart(product.name, counter)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
