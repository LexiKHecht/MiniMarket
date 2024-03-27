import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_LISTING } from '../../utils/mutations';
import FileBase64 from 'react-file-base64';




function ListingForm() {

  const [formState, setFormState] = useState({ name: '', description: '', imageURL: '', quantity: '', tags: '', amount: '' });
  const [addListing] = useMutation(NEW_LISTING);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addListing({
      variables: {
        name: formState.name,
        description: formState.description,
        imageURL: formState.imageURL,
        quantity: parseInt(formState.quantity),
        tags: formState.tags,
        price: {
          amount: formState.amount,
          currencyCode: "USD"
        },
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(formState);

  return (
    <section className='flex justify-center dark:bg-offBlack'>
      <form onSubmit={handleFormSubmit}>
          <div className="flex h-20">
            <div className="ml-5">
              <section>
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="firstName">Name</label>
                <input
                  className="mt-1 p-2 border-2 border-palePurple rounded-md shadow-lg w-48 sm:w-56 md:w-72 lg:w-96"
                  placeholder="Name"
                  name="name"
                  type="text"
                  id="name"
                  onChange={handleChange}
                />
              </section>
            </div>
          </div>
          <section className='ml-5'>
            <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="lastName">Description</label>
              <input
                className="mt-1 p-2 border-2 border-palePurple rounded-md shadow-lg w-48 sm:w-56 md:w-72 lg:w-96"
                placeholder="..."
                name="description"
                type="text"
                id="description"
                onChange={handleChange}
              />
          </section>
          <div className="ml-5">
            <div className="my-5  w-full">
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="email">Image</label>
                <FileBase64
                  name="imageURL"
                  multiple={ false }
                  onDone={({ base64 }) => setFormState({ ...formState, imageURL: base64 })} />
            </div>
          </div>
          <div className="ml-5">
            <div className="mb-5  w-full">
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="pwd">Quantity</label>
                <input
                  className=" p-2 border-2 border-palePurple rounded-md shadow-lg w-48 sm:w-56 md:w-72 lg:w-96 lg:m-auto"
                  placeholder="1"
                  name="quantity"
                  type="number"
                  id="quantity"
                  onChange={handleChange}
                />
            </div>
          </div>
          
          <div className="ml-5">
            <div className="mb-5  w-full">
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="email">Price</label>
                <input
                  className="mt-1 p-2 border-2 border-palePurple rounded-md shadow-lg w-48 sm:w-56 md:w-72 lg:w-96"
                  placeholder="$0"
                  name="amount"
                  type="amount"
                  id="amount"
                  onChange={handleChange}
                />
            </div>
          </div>
          <div className="flex justify-end my-2 m-5">
            <button type="submit" className='p-3 bg-palePurple rounded'>Post</button>
          </div>
      </form>
    </section>
  );
}

export default ListingForm;
