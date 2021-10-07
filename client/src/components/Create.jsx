import React, { useState } from "react";

import Formulario from "./Formulario.jsx";

const Create = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col">
      <div>
        <h2 className="text-center mt-10 font-lora tracking-widest text-3xl">
          Barberos
        </h2>
      </div>
      <div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="hidden lg:block lg:w-56 lg:bg-blue-600 lg:h-9 lg:text-white lg:my-3.5"
          >
            Agregar barbero
          </button>
          <img
            src="/assets/add.png"
            onClick={() => setOpenModal(true)}
            alt="Add user"
            className="cursor-pointer fixed bottom-2.5 left-2.5 w-16 rounded-full bg-white shadow-2xl border border-white lg:hidden"
          />
        </div>
        {openModal ? <Formulario setOpenModal={setOpenModal} /> : false}
      </div>
    </div>
  );
};

export default Create;
