import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-wrap justify-center content-center h-[90vh] mx-4">
      <section className='loginCard bg-white h-[31rem] w-96 p-5 rounded drop-shadow-lg'>
        <section className='h-24'>
          <h2 className='text-center text-4xl sm:text-5xl md:text-5xl lg:text-5xl mb-5 font-sans'>Welcome Back</h2>
        </section>
        
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap justfity-evenly content-center gap-3 h-28 mt-5">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600" htmlFor="email"
                >Email Address</label
              >
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
          <div className="flex flex-wrap justfity-evenly content-center gap-3 h-28">
            <div className="mb-5  w-full">
                <label className="block text-sm font-medium text-gray-600" htmlFor="email"
                  >Password</label
                >
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
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex justify-end">
            <button type="submit" className='p-3 bg-palePurple rounded'>Sign in</button>
          </div>
        </form>
        <Link to="/signup" className='flex justify-center h-30 pt-5'>Don&apos;t have an account? <span className='ml-1 underline'>Sign up here!</span></Link>
      </section>
    </div>
  );
}

export default Login;