import { Link } from "react-router-dom";
import { idbPromise } from "../utils/helpers";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import StripeContainer from "../components/StripeContainer";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

function Checkout() {
  const [showItem, setShowItem] = useState(false);
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      console.log("cart" + cart);
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  return (
    <div className="mx-auto p-6 ">
      <>
        {state.cart.map((item) => (
          <CartItem key={item._id} item={item} />
		))}
			<>
			<h3>${calculateTotal()}</h3>
			</>
			
        <Link to="/">← return the slab or suffer my curse</Link>
        {showItem ? (
          <StripeContainer />
        ) : (
          <> 
            <button  onClick={() => setShowItem(true)}>
              Confirm Your Purchase
            </button>
          </>
        )}
      </>
    </div>
  );
}
export default Checkout;
