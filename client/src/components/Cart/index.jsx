/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link, useLocation } from "react-router-dom";

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_51OxEMn03j4g81fJaMNNFMeNP5ktsatlYSVDrRZ6JANykfInoEwQx3BDPcD7u2Ch6MAodrTkE7RZHiEzkwVeqgvjj00en91rT1I');

const Cart = () => {
  const currentPage = useLocation().pathname;
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // If so, invoke the getCart method and populate the cart with the existing from the session
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      console.log("cart" + cart)
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          <ShoppingCartIcon className="h-6 w-6 text-darkGray dark:text-white" /> 
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        <XMarkIcon className="h-6 w-6 text-darkGray dark:text-white" />
      </div>
      <h2 className="text-darkGray dark:text-white">Cart</h2>

      {state.cart.length ? (
        <>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between p-2 border-t-2 border-offWhite bg-palePurple text-darkGray dark:text-white">
            <strong>Total: ${calculateTotal()}</strong>
            {/* Check to see if the user is logged in. If so render a button to check out */}
            {Auth.loggedIn() ? (
              <Link
                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                to="/Checkout"
                onClick={submitCheckout}
              >
                Checkout
              </Link>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </>
      ) : (
        <h3 className="bg-palePurple rounded-t-lg text-darkGray dark:text-white">
          Cart Empty
        </h3>
      )}
    </div>
  );
};

export default Cart;
