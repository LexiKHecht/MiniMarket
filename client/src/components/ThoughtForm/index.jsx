import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

function ThoughtForm(item){

  // const { loading, data } = useQuery(QUERY_ME);

  // console.log("DATA AFTER QUERY ME " + data);

  const productId = item.product.productId;

  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

    const [addThought, { error }] = useMutation (ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts',
      QUERY_ME,
      'me'
    ]
  });

  // const [addThought, { error }] = useMutation(ADD_THOUGHT);

  // const userData = data?.me || {};

  // console.log("USER DATA " + userData + "AUTH USERNAME " + Auth.getProfile().data.username);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token){
      return false;
    }

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
          productId
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  // if(loading){
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <div className="">
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 text-xs text-lightGray ${
              characterCount > 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9 text-offBlack">
              <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-full bg-transparent"
                style={{ lineHeight: "1.5", resize: "none" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button
                className="btn btn-primary btn-block py-3 text-xs relative inline text-offBlack hover:text-darkGray before:bg-palePurple  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
                type="submit"
             
              >
                Post Thought
                
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup to share your thoughts.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
