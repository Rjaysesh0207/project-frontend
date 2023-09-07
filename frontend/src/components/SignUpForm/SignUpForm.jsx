import { useState } from 'react';

function SignUpForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  
  });

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name,email,password} = state
      const formData = {name, email, password}
    } catch {
      setState({error: 'Sign Up Failed'});
    }
  };

  const disable = state.password !== state.confirm;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:max-w-md">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md  "
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
              required
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={state.confirm}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md "
              required
            />
          </div>
          <button
            type="submit"
            disabled={disable}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            SIGN UP
          </button>
        </form>
        {state.error && (
          <p className="text-red-600 text-center mt-4">&nbsp;{state.error}</p>
        )}
      </div>
    </div>
  );
}

export default SignUpForm;
