import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getAllFreelancer } from "../../../../../redux/actions";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "20px",
};

export default function ChildModal({ email }) {
  const { freelancer } = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFreelancer());
  }, [dispatch]);

  useEffect(() => {
    console.log(freelancer);
  }, [freelancer]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button variant="contained" sx={{}} onClick={handleOpen}>
        NUEVO CLIENTE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            ...style,
            width: "30%",
            backgroundColor: "#39394b",
            height: "600px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full justify-evenly">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Añadir clientes!
            </h2>

            <div className="flex flex-col  gap-3">
              <div className="flex  h-10  items-center  px-3 gap-4">
                <label className="w-20">Nombre: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex  h-10  items-center  px-3 gap-4">
                <label className="w-20">Pais: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex  h-10  items-center  px-3 gap-4">
                <label className="w-20">Cuidad: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex  h-10  items-center  px-3 gap-4">
                <label className="w-20">Web: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex  h-10  items-center  px-3 gap-4">
                <label className="w-20">Email: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex h-10  items-center  px-3 gap-4">
                <label className="w-20">Telefono: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
            </div>
            <div className="flex justify-around">
              <button>CLEAN</button>
              <button>ADD</button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
