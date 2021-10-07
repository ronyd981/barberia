import React, { useState } from "react";
import Axios from "axios";

import UserDeleteSuccessfully from "./UserDeleteSuccessfully.jsx";

const DeleteSuccess = (props) => {
  const [userDeleteSuccessfully, setUserDeleteSuccessfully] = useState(false);
  const [errorDB, setErrorDB] = useState(false);

  const deleteUser = () => {
    let protocol = window.location.protocol,
      host = window.location.hostname;
    try {
      const id = props.id;

      Axios.delete(`${protocol}//${host}:8081/api/delete-user/${id}`);

      setTimeout(() => {
        props.setDeleteUser(false);
        setUserDeleteSuccessfully(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorDB(true);
    }
  };

  return (
    <div>
      <div>
        <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
          <div className="flex items-center justify-center flex-col bg-white rounded w-11/12 md:w-1/4 xl:w-3/12 md:px-40 lg:w-2/6 pt-14 md:py-16 ld:py-20">
            <div className="flex items-center justify-center w-56">
              <h2 className="my-3.5 text-center lg:text-xl">
                ¿Esta seguro que desea eliminar a {props.name} {props.lastname}?
              </h2>
            </div>
            <div className="flex items-center justify-center flex-row mb-1.5">
              <button
                className="w-20 bg-red-600 h-9 text-white mx-3 mt-3.5 mb-6"
                onClick={() => {
                  deleteUser();
                  setUserDeleteSuccessfully(true);
                }}
              >
                Si
              </button>

              {userDeleteSuccessfully ? <UserDeleteSuccessfully /> : false}

              <button
                className="w-20 bg-blue-600 h-9 text-white mx-3 mt-3.5 mb-6"
                onClick={() => {
                  props.setDeleteUser(false);
                }}
              >
                No
              </button>
            </div>
            {errorDB ? (
              <p className="text-center text-red-600">Something went wrong</p>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSuccess;
