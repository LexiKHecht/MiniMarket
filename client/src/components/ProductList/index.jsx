import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import spinner from '../../assets/spinner.gif';


function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);

      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {

        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="flex justify-center pt-6 mb-2">
      {state.products.length ? (
        <div className="grid grid-cols-2  gap-14">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product.productId}
              imageURL={product.imageURL}
              name={product.name}
              price={product.price.amount}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You have not added any products yet!</h3>
      )}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </div>
  );
}

export default ProductList;
