import React, { useState, useEffect } from "react";
import Axios from "axios";

import { TimeToPay } from "./export";

const HaircutStatus = ({ priceTotal, priceBossEarnings, protocol, host }) => {
  const [users, setUsers] = useState([]);
  const [haircutStatus, setHaircutStatus] = useState();
  const [timeToPay, setTimeToPay] = useState(false);
  const [errorDB, setErrorDB] = useState(false);

  const _ = require("lodash");

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

  const addRemoveHaircut = (id, haircutAddRemove) => {
    try {
      Axios.put(`${protocol}//${host}:8081/api/update-haircut`, {
        id,
        haircutAddRemove,
      });
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  let total = _.sumBy(users, (h) => h.haircut);

  return (
    <div>
      <div className="flex items-center lg:justify-between flex-col lg:flex-row lg:w-4/5 w-full m-auto">
        <h4 className="text-base">
          Cortes realizados en el día: <b>{total}</b>
        </h4>
        <h4 className="text-base">
          Ganancias generadas en el día: <b>{total * priceTotal}$</b>
        </h4>
      </div>
      <div className="flex justify-center m-auto">
        <button
          className="w-26 bg-green-600 h-9 text-white mt-1.5 mx-3.5 text-sm px-1.5"
          onClick={() => {
            setTimeToPay((prevState) => !prevState);
          }}
        >
          Finalizar jornada
        </button>
      </div>
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
                alt="User icon"
              />
              <p className="text-lg mb-3.5">
                {user.name} {user.lastname}
              </p>
              <div className="flex items-center justify-between w-48">
                <p>Cortes realizados</p>
                <p>{user.haircut}</p>
              </div>
              {user.haircut === 1 || user.haircut === 0 ? (
                <div className="flex items-center justify-between w-48">
                  <p>Monto a pagar</p>
                  <p>{user.haircut * priceTotal}$</p>
                </div>
              ) : (
                <div className="flex items-center justify-between w-48">
                  <p>Monto a pagar</p>
                  <p>
                    {user.haircut * priceTotal -
                      (user.haircut - 1) * priceBossEarnings}
                    $
                  </p>
                </div>
              )}
              {user.haircut === 1 || user.haircut === 0 ? (
                <div className="flex items-center justify-between w-48">
                  <p>Monto a cobrar el jefe</p>
                  <p>0$</p>
                </div>
              ) : (
                <div className="flex items-center justify-between w-48">
                  <p>Monto a cobrar el jefe</p>
                  <p>{(user.haircut - 1) * priceBossEarnings}$</p>
                </div>
              )}
              <div className="flex items-center justify-between w-48">
                <p>Monto total</p>
                <p>{user.haircut * priceTotal}$</p>
              </div>
              <div className="flex items-center justify-between flex-col ">
                <button
                  className="w-48 bg-blue-600 h-9 text-white mt-3.5"
                  onClick={() => {
                    setHaircutStatus((user.haircut += 1));
                    addRemoveHaircut(user.id, user.haircut);
                  }}
                >
                  Agregar Corte
                </button>
                {user.haircut <= 0 ? (
                  <button
                    className="w-48 bg-gray-600 h-9 text-white my-3.5 cursor-default"
                    disabled={true}
                  >
                    Quitar Corte
                  </button>
                ) : (
                  <button
                    className="w-48 bg-red-600 h-9 text-white my-3.5"
                    onClick={() => {
                      if (user.haircut <= 0) return;
                      setHaircutStatus((user.haircut -= 1));
                      addRemoveHaircut(user.id, user.haircut);
                    }}
                  >
                    Quitar Corte
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center flex-col">
            <span className="my-3.5 font-lora lg:text-xl">
              Aun no se han registrado cortes
            </span>
            <img
              alt="There are no users on the system"
              className="w-4/6 md:w-11/12"
              src="/assets/users-not-found.png"
            />
          </div>
        )}
      </div>
      {errorDB ? (
        <p className="text-center text-red-600">Server down</p>
      ) : (
        false
      )}
      {timeToPay ? (
        <TimeToPay
          setTimeToPay={setTimeToPay}
          protocol={protocol}
          host={host}
        />
      ) : (
        false
      )}
    </div>
  );
};

export default HaircutStatus;
