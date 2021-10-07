import React from "react";

import { Create, BarberList, Menu } from "../components/export";

const Users = () => {
  return (
    <div>
      <Menu />
      <div>
        <Create />
      </div>
      <div>
        <BarberList />
      </div>
    </div>
  );
};

export default Users;
