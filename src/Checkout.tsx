import { useSelector } from "react-redux";
import Cart from "./Cart";
import { RootState } from "./redux/store/store";

function Checkout() {
  const basketItems = useSelector((state: RootState) => state.basket.products);

  return (
    <Cart
      products={basketItems}
      text="Click Confirm Order to place your order"
      mode="confirm"
    ></Cart>
  );
}

export default Checkout;
