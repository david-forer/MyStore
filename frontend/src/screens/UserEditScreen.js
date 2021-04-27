import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import { register } from "../actions/userActions";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="text-blue-700 underline">
        Go Back
      </Link>
      <FormContainer>
              <h1 className="mb-12 text-2xl font-bold">Edit User</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message>{ errorUpdate }</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="flex flex-wrap -mx-3 mb-6 w-1/2">
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                  type="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Email"
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
                  htmlFor="checkbox"
                >
                  is Admin
                </label>
                <input
                  className="form-checkbox"
                  type="checkbox"
                  checked={isAdmin}
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <button
                  type="submit"
                  className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  Update User
                </button>
              </div>
            </div>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
