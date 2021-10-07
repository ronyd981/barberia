import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Validation = ({ history, setLogoutMenu }) => {
  const eliminar = () => {
    history.push("/login");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white rounded w-11/12 md:w-1/4 xl:w-3/12 md:px-40 lg:w-2/6 pt-14 md:py-16 ld:py-20">
      <div className="flex items-center justify-center w-56">
        <h2 className="my-3.5 text-center lg:text-xl">
          ¿Esta seguro que desea cerrar sesión?
        </h2>
      </div>
      <div className="flex items-center justify-center flex-row">
        <NavLink exact to={"/"}>
          <button
            className="w-20 bg-red-600 h-9 text-white mx-3 mt-3.5 mb-6"
            onClick={eliminar}
          >
            Si
          </button>
        </NavLink>
        <button
          className="w-20 bg-blue-600 h-9 text-white mx-3 mt-3.5 mb-6"
          onClick={() => {
            setLogoutMenu((prevState) => !prevState);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

const LogoutSuccess = ({ history, setLogoutMenu }) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
      <Validation history={history} setLogoutMenu={setLogoutMenu} />
    </div>
  );
};

export default withRouter(LogoutSuccess);
