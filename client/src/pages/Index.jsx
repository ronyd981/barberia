import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Menu } from "../components/export";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [errorDB, setErrorDB] = useState(false);
  const [haircut, setHaircut] = useState(false);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    const _ = require("lodash");
    let total = _.sumBy(users, (h) => h.haircut);
    if (total === 0) {
      setHaircut(true);
    } else {
      setHaircut(false);
      setTotal(total);
    }
  }, [users]);

  return (
    <div>
      <Menu />
      <div className="mt-6">
        <h2 className="font-windsong text-4xl lg:text-6xl text-center">
          Welcome to your business
        </h2>
      </div>
      <div className="flex items-center justify-center my-6">
        <h2 className="lg:text-3xl text-xl text-center">
          Cortes realizados en el día: {total}
        </h2>
      </div>
      <div className="flex flex items-center justify-center flex-col md:flex-row lg:flex-row lg:flex-wrap md:flex-wrap">
        {users.length > 0
          ? users.map((user) => {
              if (user.haircut > 0) {
                return (
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
                    <div className="flex items-center justify-between w-48">
                      <p>Cortes realizados</p>
                      <p>{user.haircut}</p>
                    </div>
                  </div>
                );
              } else {
                return <div className="hidden" key={user.id}></div>;
              }
            })
          : false}
      </div>
      {haircut ? (
        <div className="flex items-center justify-center flex-col">
          <span className="mb-3.5 font-lora lg:text-xl">
            Aun no se han registrado cortes en el día
          </span>
          <img
            alt="Haircuts not found"
            className="mt-2 w-72 md:96"
            src="/assets/haircut-not-found.png"
          />
        </div>
      ) : (
        false
      )}
      {errorDB ? (
        <p className="text-center text-red-600">Server down</p>
      ) : (
        false
      )}
    </div>
  );
};

export default Index;
