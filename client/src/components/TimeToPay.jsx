import React, { useState } from "react";
import Axios from "axios";

const TimeToPay = ({ setTimeToPay, protocol, host }) => {
  const [errorDB, setErrorDB] = useState(false);

  const timeToPay = async () => {
    try {
      await Axios.put(`${protocol}//${host}:8081/api/time-to-pay`);
      window.location.reload();
    } catch (error) {
      setErrorDB(true);
    }
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
      <div className="flex items-center justify-center flex-col bg-white rounded w-11/12 md:w-1/4 xl:w-3/12 md:px-40 lg:w-2/6 pt-14 md:py-16 ld:py-20">
        <div className="flex items-center justify-center w-56">
          <h2 className="my-3.5 text-center lg:text-xl">
            ¿Esta seguro que desea finalizar la jornada?
          </h2>
        </div>
        <div className="flex items-center justify-center flex-row mb-1.5">
          <button
            className="w-20 bg-red-600 h-9 text-white mx-3 mt-3.5 mb-6"
            onClick={timeToPay}
          >
            Si
          </button>
          <button
            className="w-20 bg-blue-600 h-9 text-white mx-3 mt-3.5 mb-6"
            onClick={() => {
              setTimeToPay((prevState) => !prevState);
            }}
          >
            No
          </button>
        </div>
        {errorDB ? (
          <p className="text-center text-red-600">Server down</p>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default TimeToPay;
