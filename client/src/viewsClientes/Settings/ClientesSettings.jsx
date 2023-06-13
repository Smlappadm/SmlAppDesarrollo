import React from "react";
import { GrFormClose } from "react-icons/gr";

export default function ClientesSettings() {
  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <h2>Personal</h2>
        <div>
          <GrFormClose className="text-[red]" />
        </div>
      </div>
    </div>
  );
}
