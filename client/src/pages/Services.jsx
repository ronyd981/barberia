import React, { useEffect, useState } from "react";

import { HaircutPrice, Menu } from "../components/export";

const Services = () => {
  const [host, setHost] = useState("");
  const [protocol, setProtocol] = useState("");

  useEffect(() => {
    setProtocol(window.location.protocol);
    setHost(window.location.hostname);
  }, []);

  return (
    <div>
      <Menu />
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-center mt-5 mb-.5 font-lora tracking-widest text-2xl font-medium">
          Servicios
        </h2>
        <div className="mb-6">
          <HaircutPrice protocol={protocol} host={host} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Services;
