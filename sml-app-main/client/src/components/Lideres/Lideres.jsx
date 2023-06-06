import React from "react";
import Detail from "./Employees/Detail/Detail";
import { TableEmployees } from "./Employees/TableEmployees/TableEmployees";
import Nav from "../Nav/Nav";

function Lideres() {
  return (
    <>
      <Nav />
      <TableEmployees />
      {/* <Detail performance={true} /> */}
    </>
  );
}

export default Lideres;
