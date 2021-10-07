import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { LogoutSuccess } from "./export";

const Menu = () => {
  let history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);

  let menuMobile;

  if (showMenu) {
    menuMobile = (
      <ul className="fixed flex flex-col items-center justify-center bg-black font-lora w-screen h-screen text-white bg-opacity-75 z-10 top-0 left-0">
        <NavLink
          exact
          to={"/"}
          activeClassName="bg-blue-600 w-screen text-center h-16"
          className="my-0.5"
        >
          <li onClick={() => setShowMenu((prevState) => !prevState)}>
            <p className="text-xl tracking-widest uppercase my-4">Inicio</p>
          </li>
        </NavLink>
        <NavLink
          exact
          to={"/users"}
          activeClassName="bg-blue-600 w-screen text-center h-16"
          className="my-0.5"
        >
          <li onClick={() => setShowMenu((prevState) => !prevState)}>
            <p className="text-xl tracking-widest uppercase my-4">Usuarios</p>
          </li>
        </NavLink>
        <NavLink
          exact
          to={"/services"}
          activeClassName="bg-blue-600 w-screen text-center h-16"
          className="my-0.5"
        >
          <li onClick={() => setShowMenu((prevState) => !prevState)}>
            <p className="text-xl tracking-widest uppercase my-4">Servicios</p>
          </li>
        </NavLink>
      </ul>
    );
  }

  return (
    <div>
      <nav className="flex items-end justify-between lg:items-center bg-black shadow-md p-8 lg:p-12">
        <div className="text-white lg:mx-16">
          <h2 className="font-windsong text-4xl leading-3 lg:text-6xl">
            Barbería
          </h2>
        </div>
        <div
          className="absolute bg-white rounded-full p-1.5 cursor-pointer right-8 top-4 lg:hidden"
          onClick={() => {
            setLogoutMenu((prevState) => !prevState);
          }}
        >
          <img alt="Logout" className="w-6" src="/assets/logout.png" />
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:mx-16">
          <NavLink
            exact
            to={"/"}
            activeClassName="bg-blue-600 mx-6 p-px rounded"
            className="mx-6"
          >
            <p className="font-lora text-white text-lg tracking-widest">
              Inicio
            </p>
          </NavLink>
          <NavLink
            exact
            to={"/users"}
            activeClassName="bg-blue-600 mx-6 p-px rounded"
            className="mx-6"
          >
            <p className="font-lora text-white text-lg tracking-widest">
              Usuarios
            </p>
          </NavLink>
          <NavLink
            exact
            to={"/services"}
            activeClassName="bg-blue-600 mx-6 p-px rounded"
            className="mx-6"
          >
            <p className="font-lora text-white text-lg tracking-widest">
              Servicios
            </p>
          </NavLink>
          <div
            className="bg-white rounded-full p-1.5 cursor-pointer"
            onClick={() => {
              setLogoutMenu((prevState) => !prevState);
            }}
          >
            <img alt="Logout" className="w-7" src="/assets/logout.png" />
          </div>
        </div>
        <img
          alt="Menu icon"
          className="cursor-pointer fixed bottom-2.5 right-2.5 z-20 w-16 rounded-full bg-white shadow-2xl border border-white lg:hidden"
          src="/assets/menu.png"
          onClick={() => {
            setShowMenu((prevState) => !prevState);
          }}
        />
        {menuMobile}
      </nav>
      {logoutMenu ? (
        <LogoutSuccess history={history} setLogoutMenu={setLogoutMenu} />
      ) : (
        false
      )}
    </div>
  );
};

export default Menu;
