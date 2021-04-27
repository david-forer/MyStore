import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import { register } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
import { listUsers, deleteUser } from "../actions/userActions";
import {
  BanIcon,
  BadgeCheckIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

const UserListScreen = ({history}) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success:successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login')
      }
   
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if(window.confirm('Are You Sure?'))
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1 className="text-2xl mb-12 font-bold"> Users </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <BadgeCheckIcon className="h-5 w-5 text-blue-500" />
                  ) : (
                    <BanIcon className="h-5 w-5 text-red-500" />
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`} className="">
                    <PencilAltIcon className="h-6 w-6 text-indigo-500" />
                  </Link>
                </td>
                <td>
                  <Link className="" onClick={() => deleteHandler(user._id)}>
                    <TrashIcon className="h-6 w-6 text-indigo-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
