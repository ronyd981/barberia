import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-24 flex items-center justify-center flex-col">
      <h2 className="text-2xl">No se encuentra la página</h2>
      <img
        alt="Page not found"
        className="w-32 mt-1.5"
        src="/assets/error-404.png"
      />
      <Link to="/" className="text-blue-600 mt-6">
        Regresa a la página principal
      </Link>
    </div>
  );
};

export default NotFound;
