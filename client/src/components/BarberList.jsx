import React, { useState, useEffect } from "react";
import Axios from "axios";

import { DeleteSuccess, EditUser } from "./export";

const BarberList = () => {
  const [deleteUser, setDeleteUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [editNameLastname, setEditNameLastname] = useState({});
  const [users, setUsers] = useState([]);
  const [errorDB, setErrorDB] = useState(false);

  useEffect(() => {
    let protocol = window.location.protocol,
      host = window.location.hostname;
    const gettingData = async () => {
      try {
        await Axios.get(`${protocol}//${host}:8081/api/get-data`).then(
          (response) => {
            setUsers(response.data);
          }
        );
      } catch (error) {
        setErrorDB(true);
      }
    };
    gettingData();
  }, []);

  return (
    <div className="flex items-center justify-center p-3.5">
      <div className="flex flex items-center justify-center flex-col md:flex-row lg:flex-row lg:flex-wrap md:flex-wrap">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              className="flex items-center flex-col p-3.5 my-5 shadow-md font-lora font-medium lg:mx-12 md:mx-6 w-72"
              key={user.id}
            >
              <img
                className="w-36 my-5"
                src="/assets/user.png"
                alt="User profile"
              />
              <p className="text-lg mb-3.5 text-center">
                {user.name} {user.lastname}
              </p>
              <div className="mb-5">
                <button
                  className="w-20 bg-blue-600 h-9 text-white mx-3"
                  onClick={() => {
                    setEditUser(true);
                    setId(user.id);
                    setEditNameLastname({
                      name: user.name,
                      lastname: user.lastname,
                    });
                  }}
                >
                  Editar
                </button>
                {editUser ? (
                  <EditUser
                    setEditUser={setEditUser}
                    id={id}
                    editNameLastname={editNameLastname}
                  />
                ) : (
                  false
                )}

                <button
                  className="w-20 bg-red-600 h-9 text-white mx-3"
                  onClick={() => {
                    setDeleteUser(true);
                    setId(user.id);
                    setName(user.name);
                    setLastname(user.lastname);
                  }}
                >
                  Eliminar
                </button>
                {deleteUser ? (
                  <DeleteSuccess
                    setDeleteUser={setDeleteUser}
                    id={id}
                    name={name}
                    lastname={lastname}
                  />
                ) : (
                  false
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center flex-col">
            <span className="mb-3.5 font-lora lg:text-xl">
              Aun no se han registrado barberos
            </span>
            <img
              alt="There are no users on the system"
              className="w-4/6 md:w-11/12"
              src="/assets/users-not-found.png"
            />
          </div>
        )}
        {errorDB ? (
          <p className="text-center text-red-600">Server down</p>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default BarberList;
