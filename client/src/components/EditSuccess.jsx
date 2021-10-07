import React from "react";

const EditSuccess = () => {
  return (
    <div>
      <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
        <div className="flex items-center justify-center flex-col bg-white rounded w-11/12 md:w-1/4 xl:w-3/12 md:px-40 lg:w-2/6 pt-14 md:py-16 ld:py-20 font-lora">
          <h2 className="text-xl md:text-lg mb-1.5 text-center">
            Usuario modificado correctamente
          </h2>
          <img
            className="w-16 my-3.5"
            src="/assets/comprobado.png"
            alt="Success"
          />
        </div>
      </div>
    </div>
  );
};

export default EditSuccess;
