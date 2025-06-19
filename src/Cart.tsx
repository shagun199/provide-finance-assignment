import { Button, List, ListItem, ListItemText, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAll } from "./redux/store/slices/basketSlice";

type Product = {
  title: string;
  quantity: number;
  price: number;
};

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
        Total Price: {products.reduce((total, { price }) => total + price, 0)}
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
        message="Wohoo!! Order placed successfully"
      />
    </div>
  );
}

export default Cart;
