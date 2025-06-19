import { Button, List, ListItem, ListItemText, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAll, Product } from "./redux/store/slices/basketSlice";

type CartProps = {
  products?: Product[];
  text?: string;
  mode?: "browse" | "confirm";
};

function Cart({
  products = [],
  text = "Browse the items in your cart and then click Checkout",
  mode = "browse",
}: CartProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [toggleSnackbar, setToggleSnackbar] = useState(false);

  const checkOut = () => {
    navigate("/checkout");
  };

  const confirmOrder = () => {
    dispatch(clearAll());
    setToggleSnackbar(true);
  };

  const closeSnackbar = () => {
    setToggleSnackbar(false);
    navigate("/products");
  };

  const calcDiscountedPrice = (
    price: number,
    discount: number,
    quantity: number
  ) => {
    return (price - (price * discount) / 100) * quantity;
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>{text}</p>
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={product.title}
              secondary={"Quantity: " + product.quantity}
            />
          </ListItem>
        ))}
      </List>
      <div>
        <span>
          Total Price:&nbsp;
          <span style={{ color: "red", fontWeight: 600 }}>
            {products.reduce(
              (total, { price, quantity }) => total + price * quantity,
              0
            )}
          </span>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          Discounted Price:&nbsp;
          <span style={{ color: "green", fontWeight: 600 }}>
            {products
              .reduce(
                (total, { price, discountPercentage, quantity }) =>
                  total +
                  calcDiscountedPrice(price, discountPercentage, quantity),
                0
              )
              .toFixed(2)}
          </span>
        </span>
      </div>
      {mode === "browse" ? (
        <Button
          style={{ marginBottom: 10 }}
          onClick={checkOut}
          variant="contained"
          disabled={products.length < 1}
        >
          Checkout
        </Button>
      ) : (
        <Button
          style={{ marginBottom: 10 }}
          variant="contained"
          onClick={confirmOrder}
          disabled={products.length < 1}
        >
          Confirm Order
        </Button>
      )}

      <Snackbar
        open={toggleSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message="Wohoo!! Order placed successfully!!!"
      />
    </div>
  );
}

export default Cart;
