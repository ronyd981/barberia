import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { withRouter, useHistory, Link } from "react-router-dom";
import Axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorBD, setErrorBD] = useState(false);
  const [userLogin, setUserLogin] = useState("");

  let history = useHistory();

  Axios.defaults.withCredentials = true;

  const onSubmit = async (data) => {
    let protocol = window.location.protocol,
      host = window.location.hostname;
    try {
      await Axios.post(`${protocol}//${host}:8081/api/login`, {
        username: data.name,
        password: data.password,
      }).then((response) => {
        if (response.data.message) {
          setUserLogin(response.data.message);
        }

        if (response.data.access) {
          setUserLogin("Cargando...");
          localStorage.setItem("token", response.data.token);
          history.push("/");
          window.location.reload();
        }
      });
    } catch (error) {
      setErrorBD(true);
    }
  };

  return (
    <div className="w-80 h-96 shadow-2xl">
      <h2 className="font-windsong text-4xl mt-12 font-semibold 2xl:text-5xl text-center">
        Iniciar sesión
      </h2>
      <div className="flex items-center justify-center flex-col bg-white rounded w-auto py-6 font-lora max-w-screen-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-start mt-3.5 w-56">
            <label className="font-lora">Nombre de usuario</label>
          </div>
          <input
            className="bg-gray-200 outline-none w-56 h-9 px-1.5"
            name="name"
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Debe ingresar nombre de usuario",
              },
            })}
          />
          <div className="w-56">
            <span className="text-red-600 text-sm">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex items-center justify-start mt-3.5 w-56">
            <label className="font-lora">Contraseña</label>
          </div>
          <input
            className="bg-gray-200 outline-none w-56 h-9 px-1.5"
            name="password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Debe ingresar la contraseña",
              },
            })}
          />
          <div className="w-56">
            <span className="text-red-600 text-sm leading-3">
              {errors?.password?.message}
            </span>
          </div>
          <div className="flex items-center justify-center w-56 mt-3.5">
            <button
              className="w-44 bg-black h-9 text-white my-3.5 text-white"
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>

          {errorBD ? (
            <p className="text-center text-red-600">Server down</p>
          ) : (
            false
          )}
          <p className="text-center text-red-600 text-sm">{userLogin}</p>
        </form>
        <Link to="/guest">
          <span className="text-blue-600">Continuar como invitado</span>
        </Link>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden px-2">
      <Form />
    </div>
  );
};

export default withRouter(Login);
