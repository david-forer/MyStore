import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link
              to="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                MyStore<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              <Link
                to="/"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              to="/cart"
              className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
            >
              Cart
            </Link>

            {userInfo ? (
              <div className="group inline-block relative">
                <button className="bg-gray-300  text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                  <span className="mr-1">{userInfo.name}</span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className=" text-gray-700 pt-1 group-hover:block">
                  <li className="">
                    <Link
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      onClick={logoutHandler}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
              >
                Sign in
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="group inline-block relative">
                <button className="bg-gray-300  text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                  <span className="mr-1">{userInfo.name}</span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className=" text-gray-700 pt-1 group-hover:block">
                  <li className="">
                    <Link
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      to="/admin/userList"
                      title="Admin"
                      id="adminmenu"
                    >
                      Users
                    </Link>
                  </li>
                </ul>
                <ul className=" text-gray-700 pt-1 group-hover:block">
                  <li className="">
                    <Link
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      to="/admin/productList"
                    >
                      Products
                    </Link>
                  </li>
                </ul>
                <ul className=" text-gray-700 pt-1 group-hover:block">
                  <li className="">
                    <Link
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      to="/admin/orderList"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
