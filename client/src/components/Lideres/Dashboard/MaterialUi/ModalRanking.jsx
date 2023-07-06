import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddLeads, getFreelancers } from "../../../../redux/actions";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "40%",
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

export default function ChildModal() {
  const { allCorredores } = useSelector((state) => state);
  const [freelancer, setFreelancer] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFreelancers());
  }, [dispatch]);

  useEffect(() => {
    setFreelancer(allCorredores);
  }, [allCorredores]);
  useEffect(() => {
    console.log(freelancer);
  }, [freelancer]);

  const handleInput = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const SendAddLeads = () => {
    toast.info(`✔ ADD LEADS! `, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const SendAddLeadsError = () => {
    toast.error(`❌ SELECCIONA UN ARCHIVO!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button variant="contained" sx={{}} onClick={handleOpen}>
        RANKING
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "40%",
            backgroundColor: "#39394b",
            height: "500px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full ">
            <h2>Ranking de Freelancers</h2>

            {freelancer &&
              freelancer.map((free) => (
                <div className="flex justify-between items-center bg-black h-1/6 rounded-xl p-3">
                  <p className="w-3/12">{free}</p>
                  <p className="w-3/12">checkeados</p>
                  <p className="w-3/12">ventas</p>
                  <p className="w-1/12">10</p>
                  <p className="w-2/12">10</p>
                </div>
              ))}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
