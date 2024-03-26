import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import ThoughtList from "../../components/ThoughtList";
import ThoughtForm from "../../components/ThoughtForm";
import { QUERY_THOUGHTS } from "../../utils/queries";



function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

 const { data } = useQuery(QUERY_THOUGHTS);

  const {
    imageURL,
    name,
    _id,
    price,
    // quantity -can't get this working :(
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

    const thoughts = data?.thoughts || [];

  return (
    <div className="m-2">
      <div className="max-w-screen flex max-h-screen items-center justify-center bg-gray-100">
        <div className="flex font-sans">
          <div className="relative w-48 flex-none">
            <Link to={`/products/${_id}`}>
              <img
                className="absolute inset-0 h-full w-full object-scale-down"
                loading="lazy"
                alt={name}
                src={imageURL}
              />
            </Link>
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-xl font-semibold text-gray-900">
                {name}
              </h1>
              <div className="text-black-500 text-lg font-semibold">
                ${price}
              </div>
              <div className="text-black-700 mt-2 w-full flex-none text-sm font-medium">
                In stock
              </div>
            </div>
            <div className="mb-6 mt-4 flex items-baseline border-b border-slate-200 pb-6">
              <div className="flex space-x-2 text-sm">
                <label>
                  <input
                    className="peer sr-only h-9 w-12"
                    name="size"
                    type="radio"
                    value="xs"
                  />
                  <div className="peer-checked:bg-palePurple flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 peer-checked:font-semibold peer-checked:text-white">
                    XS
                  </div>
                </label>
                <label>
                  <input
                    className="peer sr-only w-12"
                    name="size"
                    type="radio"
                    value="s"
                  />
                  <div className="peer-checked:bg-palePurple flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 peer-checked:font-semibold peer-checked:text-white">
                    S
                  </div>
                </label>
                <label>
                  <input
                    className="peer sr-only w-12"
                    name="size"
                    type="radio"
                    value="m"
                  />
                  <div className="peer-checked:bg-palePurple flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 peer-checked:font-semibold peer-checked:text-white">
                    M
                  </div>
                </label>
                <label>
                  <input
                    className="peer sr-only w-12"
                    name="size"
                    type="radio"
                    value="l"
                  />
                  <div className="peer-checked:bg-palePurple flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 peer-checked:font-semibold peer-checked:text-white">
                    L
                  </div>
                </label>
                <label>
                  <input
                    className="peer sr-only w-12"
                    name="size"
                    type="radio"
                    value="xl"
                  />
                  <div className="peer-checked:bg-palePurple flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 peer-checked:font-semibold peer-checked:text-white">
                    XL
                  </div>
                </label>
              </div>
            </div>
            <div className="mb-6 flex space-x-4 text-sm font-medium">
              <div className="flex flex-auto space-x-4">
                <button
                  onClick={addToCart}
                  className="border-balck-800 h-10 rounded-md border px-6 font-semibold text-gray-900"
                  type="button"
                >
                  Add to cart
                </button>
              </div>
              <button
                className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-slate-200 text-slate-300"
                type="button"
                aria-label="Favorites"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-700">Free shipping</p>
          </form>
        </div>
      </div>
      <div
        className="col-12 col-md-10 mb-3 rounded-b-lg bg-gray-100 p-3"
        style={{ border: "3px solid #bbafdb " }}
      >
        <ThoughtForm />
      </div>
      <div>
        <ThoughtList
          className=""
          thoughts={thoughts}
          title="Some Feed for Thought(s)..."
        />
      </div>
    </div>
  );
}

export default ProductItem;
