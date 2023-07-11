import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import gold from "../../../../../Assets/gold.png";
import silver from "../../../../../Assets/silver.png";
import bronze from "../../../../../Assets/bronze.png";
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

export default function ChildModal() {
  const { freelancer } = useSelector((state) => state);
  const [allFreelancer, setFreelancer] = useState("");
  const [infoFreelancer, setInfoFreelancer] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const place = [gold, silver, bronze];

  useEffect(() => {
    dispatch(getAllFreelancer());
  }, [dispatch]);

  useEffect(() => {
    setFreelancer(freelancer);
  }, [freelancer]);
  useEffect(() => {
    InfoFreelancer();
  }, [allFreelancer]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const InfoFreelancer = async () => {
    let body;
    const infoPromises =
      allFreelancer &&
      allFreelancer.map(async (free) => {
        const response = await axios.get(`/lead/freelancer?name=${free.name}`);
        const data = response.data;
        body = { [free.name]: data, photo: free.photo };
        return body;
      });
    const info = await Promise.all(infoPromises);
    // const infoMap = info.map((ventas) => {
    //   const ventasArray = ventas[Object.keys(ventas)];
    //   const ventasMap = ventasArray.reduce((total, ventas) => {
    //     if (ventas.status === "Contratado") {
    //       return total + 1;
    //     }
    //     return total;
    //   }, 0);
    //   return ventasMap;
    // });
    const sortedInfo = [...info].sort((a, b) => {
      const first = b[Object.keys(b)[0]];
      const sortedB = first.reduce((total, ventas) => {
        if (ventas.status === "Contratado") {
          return total + 1;
        }
        return total;
      }, 0);

      const last = a[Object.keys(a)[0]];
      const sortedA = last.reduce((total, ventas) => {
        if (ventas.status === "Contratado") {
          return total + 1;
        }
        return total;
      }, 0);

      return sortedB - sortedA;
    });
    // console.log(sortedInfo);
    //console.log(info[0][Object.keys(info[0])[0]][0].status);
    setInfoFreelancer(sortedInfo);
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
            width: "40%",
            backgroundColor: "#39394b",
            height: "800px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full ">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Añadir clientes!
            </h2>

            <div className="flex flex-col  gap-3">
              <div className="flex bg-black h-10  items-center  px-3 gap-4">
                <label>Nombre: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent"
                />
              </div>
              <div className="flex bg-black h-10  items-center  px-3 gap-4">
                <label>Pais: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent"
                />
              </div>
              <div className="flex bg-black h-10  items-center  px-3 gap-4">
                <label>Cuidad: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent"
                />
              </div>
              <div className="flex bg-black h-10  items-center  px-3 gap-4">
                <label>Web: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex bg-black h-10  items-center  px-3 gap-4">
                <label>Email: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
              <div className="flex h-10  items-center  px-3 gap-4">
                <label>Telefono: </label>
                <input
                  type="text"
                  placeholder="algo"
                  className=" bg-transparent w-full rounded-lg pl-3 h-full border border-white "
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
