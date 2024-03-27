import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-wrap justify-center content-center h-full dark:bg-offBlack">
      <section className='loginCard bg-white h-[34rem] lg:w-[28rem] md:w-[28rem] sm:w-[28rem] w-[21rem] p-5 rounded drop-shadow-lg dark:bg-darkGray'>
        <section className='h-24'>
          <h2 className='text-center text-4xl sm:text-5xl md:text-5xl lg:text-5xl mb-5 font-sans'>Sign up!</h2>
        </section>
        
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap justfity-evenly content-center gap-3 h-20">
            <div className="w-full flex gap-3 justify-evenly">
              <section>
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="firstName">First Name</label>
                <input
                  className="mt-1 p-2 border rounded-md shadow-lg w-36 sm:w-full"
                  placeholder="First"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </section>
              <section>
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="lastName">Last Name</label>
                <input
                  className="mt-1 p-2 border rounded-md shadow-lg w-36 sm:w-full"
                  placeholder="Last"
                  name="lastName"
                  type="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
              </section>
            </div>
          </div>
          <div className="flex flex-wrap justfity-evenly content-center gap-3 h-20">
            <div className="mb-5  w-full">
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="email">Username</label>
                <input
                  className="mt-1 p-2 w-full border rounded-md shadow-lg"
                  placeholder="Username"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleChange}
                />
            </div>
          </div>
          <div className="flex flex-wrap justfity-evenly content-center gap-3 h-20">
            <div className="mb-5  w-full">
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="email">Email</label>
                <input
                  className="mt-1 p-2 w-full border rounded-md shadow-lg"
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
            </div>
          </div>
          <div className="flex flex-wrap justfity-evenly content-center gap-3 h-20">
            <div className="mb-5  w-full">
                <label className="block text-sm font-medium text-gray-600 dark:text-offWhite" htmlFor="pwd">Password</label>
                <input
                  className="mt-1 p-2 w-full border rounded-md shadow-lg"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
            </div>
          </div>
          <div className="flex justify-end my-2">
          <button type="submit" className='p-3 bg-palePurple rounded '>Sign up</button>
        </div>
        </form>
        <Link to="/login" className='flex justify-center h-30 pt-2 '>Already have an account? <span className='ml-1 underline'>Sign in here!</span></Link>
      </section>
    </div>
      );
    }

export default Signup;
