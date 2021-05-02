import React from "react";
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import { logout } from "../actions/userActions";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import SearchBox from './SearchBox'

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
          <div> <Route render={({ history }) => <SearchBox history={history} />} /></div>

          <div className="flex  ml-2 space-x-4 ">
            <Link
              to="/cart"
              className="mr-2 font-xs leading-6 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCartIcon className="h-7 w-7 text-blue-500 "/>
            </Link>

            {userInfo ? (
              <div className="">
                <Menu as="div" className="">
                  <Menu.Button className="bg-gray-300  text-gray-700 font-semibold py-2 px-4 rounded inline-flex justify-center w-full">
                    <span className="mr-1">{userInfo.name}</span>
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Menu.Items className=" text-gray-700 pt-1 ">
                    <div className="">
                      <Menu.Item>
                        <Link
                          className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          onClick={logoutHandler}
                          to="/"
                        >
                          Logout
                        </Link>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Sign Up
                </Link>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="">
                <Menu as="div" className="">
                  <Menu.Button className="bg-gray-300  text-gray-700 font-semibold py-2 px-4 rounded inline-flex justify-center w-full">
                    <span className="mr-1">Admin Pages</span>
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Menu.Items className=" text-gray-700 pt-1">
                    <div className="">
                      <Menu.Item>
                        <Link
                          className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          to="/admin/userList"
                          title="Admin"
                          id="adminmenu"
                        >
                          Users
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          to="/admin/productList"
                        >
                          Products
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                          to="/admin/orderList"
                        >
                          Orders
                        </Link>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
