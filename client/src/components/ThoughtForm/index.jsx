import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import ThoughtList from "../../components/ThoughtList";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS } from "../../utils/queries";

import Auth from "../../utils/auth";

function ThoughtForm(item) {
  const productId = item.product.productId;

  const { data } = useQuery(QUERY_THOUGHTS, {
    variables: { productId },
  });

  console.log(data);

  const thoughts = data?.thoughts || [];

  const [thoughtText, setThoughtText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      {
        variables: { productId },
      },
    ],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
          productId,
        },
      });

      setThoughtText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="">
      {Auth.loggedIn() ? (
        <>
          <p
            className={`text-lightGray m-0 text-xs ${
              characterCount > 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="justify-space-between-md align-center flex-row justify-center"
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
                className="btn btn-primary btn-block text-offBlack hover:text-darkGray before:bg-palePurple relative inline py-3 text-xs  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
                type="submit"
              >
                Post Thought
              </button>
            </div>
            <div>
              {
                <ThoughtList
                  className=""
                  thoughts={thoughts}
                  title="Thoughts on this product..."
                />
              }
            </div>
            {error && (
              <div className="col-12 bg-danger my-3 p-3 text-white">
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
}

export default ThoughtForm;
