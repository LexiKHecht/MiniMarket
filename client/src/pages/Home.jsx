import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import { useQuery } from '@apollo/client';

// Import the query we are going to execute from its file
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {

  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      <Cart />
    </div>
  );
};

export default Home;
