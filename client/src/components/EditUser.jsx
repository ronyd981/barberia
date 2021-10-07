import React, { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";

import EditSuccess from "./EditSuccess.jsx";

const EditUser = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.editNameLastname,
  });

  const [editSuccess, setEditSuccess] = useState(false);
  const [errorDB, setErrorDB] = useState(false);

  const onSubmit = (data) => {
    let protocol = window.location.protocol,
      host = window.location.hostname;
    try {
      Axios.put(`${protocol}//${host}:8081/api/update`, {
        id: props.id,
        name: data.name,
        lastname: data.lastname,
      });

      setEditSuccess(true);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorDB(true);
    }
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
      <div className="flex items-center justify-center flex-col bg-white rounded w-11/12 md:w-1/4 xl:w-3/12 md:px-40 lg:w-2/6 pt-14 md:py-16 ld:py-20 font-lora">
        <h2 className="font-windsong text-4xl mb-3.5 font-semibold 2xl:text-5xl text-center">
          Editar usaurio
        </h2>
        <div>
          <form
            className="flex items-center justify-center flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="">Nombre</label>
            <input
              className="bg-gray-200 outline-none w-56 h-9 px-1.5 mb-1.5"
              type="text"
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
            <label className="">Apellido</label>
            <input
              className="bg-gray-200 outline-none w-56 h-9 px-1.5"
              type="text"
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
            <div className="my-6">
              <button
                className="w-20 bg-blue-600 h-9 text-white mx-2.5"
                type="submit"
              >
                Editar
              </button>
              {editSuccess ? <EditSuccess /> : false}

              <button
                className="w-20 bg-red-600 h-9 text-white mx-2.5"
                type="button"
                onClick={() => {
                  props.setEditUser(false);
                }}
              >
                Cancelar
              </button>
            </div>
            {errorDB ? (
              <p className="text-center text-red-600">Something went wrong</p>
            ) : (
              false
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
