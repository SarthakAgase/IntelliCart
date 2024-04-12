
export default function Cart({ products, onRemoveFromCart }) {
  const cartProduct = Object.keys(products).filter(
    (productname) => products[productname].added_to_cart
  );
  return (
    <div
      className="cart"
      style={{
        overflowY: "scroll",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        margin: "10px",
        minWidth: "480px",
      }}
    >
      <h2 style={{ marginTop: "0px", marginBottom: "10px" }}>Cart</h2>
      {cartProduct.length ? (
        cartProduct.map((productname) => (
          <CartProduct
            product={products[productname]}
            onRemoveFromCart={onRemoveFromCart}
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
              marginTop: "100px",
            }}
          >
            Cart Empty
          </h1>
        </div>
      )}
    </div>
  );
}

function CartProduct({ product, onRemoveFromCart }) {
  return (
    <>
      <div
        className="product-cart"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "800px",
          marginBottom: "10px",
        }}
      >
        {/* Name and Quantity Section */}
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <h3
            style={{
              fontSize: "1.5em",
              marginBottom: "10px",
              marginTop: "0px",
            }}
          >
            {product.name}
          </h3>
          <label htmlFor="quantity" style={{ fontSize: "1.2em" }}>
            Quantity: {product.quantity}
          </label>
        </div>
        {/* Photo Section */}
        <div style={{ flex: 1, paddingRight: "0px" }}>
          <img
            src={`/images/${product.name}.jpg`}
            alt="product_image"
            width={150}
            height={125}
            style={{ width: "150px", height: "125px", objectFit: "cover" }}
          />
        </div>
        {/* Price and Remove from Cart Button Section */}
        <div style={{ flex: 1, marginLeft: "30px" }}>
          <p style={{ fontSize: "1.5em", margin: 0 }}>
            $ {(product.price * product.quantity).toFixed(2)}
          </p>
          <button
            type="button"
            className="btn btn-danger"
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              fontSize: "1em",
              cursor: "pointer",
            }}
            onClick={() => onRemoveFromCart(product.name)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
