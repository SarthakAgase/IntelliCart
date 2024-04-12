export default function CartSummary({ products }) {
  const totalPrice = Object.keys(products)
    .filter((productname) => products[productname].added_to_cart)
    .reduce(
      (total, productname) =>
        total + products[productname].quantity * products[productname].price,
      0
    )
    .toFixed(2);
  const productsInCart = Object.keys(products).filter(
    (productname) => products[productname].added_to_cart
  ).length;
  const itemsInCart = Object.keys(products)
    .filter((productname) => products[productname].added_to_cart)
    .reduce((total, productname) => total + products[productname].quantity, 0);
  return (
    <>
      <div
        className="section"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          minWidth: "505px",
          height: "250px",
        }}
      >
        <h2 style={{ marginTop: "0px", marginBottom: "15px" }}>Cart Summary</h2>
        <div
          className="billing-cart"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <h3 style={{ fontSize: "1.2em", margin: "0px" }}>
            Products in Cart:{" "}
            <span style={{ fontSize: "1.2em", margin: "0px" }}>
              {productsInCart}
            </span>
          </h3>
          <h3 style={{ fontSize: "1.2em", margin: "0px" }}>
            Items in Cart: $
            <span style={{ fontSize: "1.2em", margin: "0px" }}>
              {itemsInCart}
            </span>
          </h3>
          <h3 style={{ fontSize: "1.2em", margin: "0px" }}>
            GST: <span style={{ fontSize: "1.2em", margin: "0px" }}>18%</span>
          </h3>
          <h3 style={{ fontSize: "1.2em", margin: "0px" }}>
            Price:
            <span style={{ fontSize: "1.2em", margin: "0px" }}>
              {totalPrice}
            </span>
          </h3>

          <h4 style={{ fontSize: "1.5em", margin: "0px" }}>
            Total Price:
            <span style={{ fontSize: "1.2em", margin: "0px" }}>
              $ {(totalPrice * 1.18).toFixed(2)}
            </span>
          </h4>
        </div>
      </div>
    </>
  );
}
