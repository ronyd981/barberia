import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

import CreateSuccess from "./CreateSuccess.jsx";

const Formulario = ({ setOpenModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userCreateSuccesfully, setUserCreateSuccesfully] = useState(false);
  const [errorDB, setErrorDB] = useState(false);

  const onSubmit = async (data) => {
    try {
      let protocol = window.location.protocol,
        host = window.location.hostname;

      let first = data.name,
        second = data.lastname,
        name = (await first[0].toUpperCase()) + first.slice(1),
        lastname = (await second[0].toUpperCase()) + second.slice(1);

      await Axios.post(`${protocol}//${host}:8081/api/creating-user`, {
        id: uuidv4(),
        name: name,
        lastname: lastname,
        haircut: 0,
      });

      setUserCreateSuccesfully(true);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorDB(true);
    }
  };

  return (
    <div>
      <form
        className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-30 p-3.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-center flex-col bg-white rounded w-96 md:px-40 pt-14 md:py-16 ld:py-20 font-lora max-w-screen-sm">
          <h2 className="font-windsong text-4xl mb-3.5 font-semibold 2xl:text-5xl text-center">
            Agregar usuario
          </h2>
          <div className="flex items-center justify-start mt-3.5 w-56">
            <label>Nombre</label>
          </div>
          <input
            className="bg-gray-200 outline-none w-56 h-9 px-1.5"
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Debe ingresar el nombre",
              },
              pattern: {
                value: /^[a-zA-ZÑ-ñ]+$/,
                message:
                  "El nombre no puede contener numeros, espacios, ni caracteres especiales",
              },
              minLength: {
                value: 2,
                message: "El nombre debe tener dos o mas caracteres",
              },
              maxLength: {
                value: 18,
                message: "El nombre no puede ser mayor a 18 caracteres",
              },
            })}
          />
          <div className="w-56">
            <span className="text-red-600 text-sm">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex items-center justify-start mt-3.5 w-56">
            <label>Apellido</label>
          </div>
          <input
            className="bg-gray-200 outline-none w-56 h-9 px-1.5"
            name="lastname"
            {...register("lastname", {
              required: {
                value: true,
                message: "Debe ingresar el apellido",
              },
              pattern: {
                value: /^[a-zA-ZÑ-ñ]+$/,
                message:
                  "El apellido no puede contener numeros, espacios, ni caracteres especiales",
              },
              minLength: {
                value: 2,
                message: "El apellido debe tener dos o mas caracteres",
              },
              maxLength: {
                value: 18,
                message: "El apellido no puede ser mayor a 18 caracteres",
              },
            })}
          />
          <div className="w-56">
            <span className="text-red-600 text-sm">
              {errors?.lastname?.message}
            </span>
          </div>
          <div className="flex items-center justify-center flex-row mt-8 mb-5 leading-relaxed">
            <button
              className="w-20 bg-blue-600 h-9 text-white mx-2.5"
              type="submit"
            >
              Registrar
            </button>
            <button
              className="w-20 bg-red-600 h-9 text-white mx-2.5"
              type="button"
              onClick={() => {
                setOpenModal((prevState) => !prevState);
              }}
            >
              Cancelar
            </button>
          </div>
          {errorDB ? (
            <p className="text-center text-red-600 mb-3.5">Server down</p>
          ) : (
            false
          )}
        </div>
      </form>
      {userCreateSuccesfully ? <CreateSuccess /> : false}
    </div>
  );
};

export default Formulario;
