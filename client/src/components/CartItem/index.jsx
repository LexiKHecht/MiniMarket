import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { TrashIcon } from "@heroicons/react/24/outline";

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row p-2 bg-palePurple rounded gap-2 text-darkGray dark:text-white m-2">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div className="dark:text-offBlack">
          {item.name}, ${item.unit_amount}
        </div>
        <div>
          <span className="dark:text-offBlack">Qty:</span>
          <input
            type="number"
            placeholder="1"
            className="bg-transparent dark:text-offBlack"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
           <TrashIcon className="float-right h-4 w-4 text-darkGray " /> 

          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
