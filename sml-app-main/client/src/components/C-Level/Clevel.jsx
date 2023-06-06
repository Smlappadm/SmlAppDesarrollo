import React from "react";
import Nav from "../Nav/Nav";
import { TableClevel } from "./Employees/TableEmployees/TableClevel";
import Detail from "./Employees/Detail/Detail";

function Clevel() {
  return (
    <>
      <Nav />
      <TableClevel />
      {/* <Detail performance={true} /> */}
    </>
  );
}

export default Clevel;
