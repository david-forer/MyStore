import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="mb-12 text-2xl font-bold">Sign In</h1>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="flex flex-wrap -mx-3 mb-6 w-1/2">
          <div className="w-full md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Password"
            >
              Email address
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <button
              type="submit"
              className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
            >
              Sign in
            </button>
          </div>
        </div>
        <span className="text-sm">
          or{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-blue-500"
          >
            register a new account
          </Link>
        </span>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
