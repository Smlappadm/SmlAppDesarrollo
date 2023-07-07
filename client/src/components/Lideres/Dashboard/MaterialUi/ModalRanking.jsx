import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddLeads, getFreelancers } from "../../../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  const { allFreelancers } = useSelector((state) => state);
  const [freelancer, setFreelancer] = useState("");
  const [infoFreelancer, setInfoFreelancer] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFreelancers());
  }, [dispatch]);

  useEffect(() => {
    setFreelancer(allFreelancers);
  }, [allFreelancers]);
  useEffect(() => {
    InfoFreelancer();
  }, [freelancer]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const InfoFreelancer = async () => {
    let body;
    const infoPromises =
      freelancer &&
      freelancer.map(async (name) => {
        const response = await axios.get(`/lead/freelancer?name=${name}`);
        const data = response.data;
        body = { [name]: data };
        return body;
      });
    const info = await Promise.all(infoPromises);
    const infoMap = info.map((ventas) => {
      const ventasArray = ventas[Object.keys(ventas)];
      const ventasMap = ventasArray.reduce((total, ventas) => {
        if (ventas.status === "Contratado") {
          return total + 1;
        }
        return total;
      }, 0);
      return ventasMap;
    });
    console.log(infoMap);
    //console.log(info[0][Object.keys(info[0])[0]][0].status);
    setInfoFreelancer(info);
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
            height: "800px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full ">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Ranking de Freelancers!
            </h2>

            {infoFreelancer &&
              infoFreelancer.map((free, index) => {
                const firstProperty = Object.keys(infoFreelancer[index])[0];
                const Leads = infoFreelancer[index]?.[firstProperty];
                const totalLeadsAsignados = Leads.length || 0;
                const LeadsChecked = Leads.reduce((total, lead) => {
                  if (lead.checked === true) {
                    return total + 1;
                  }
                  return total;
                }, 0);
                const LeadsVendidos = Leads.reduce((total, lead) => {
                  if (lead.status === "Contratado") {
                    return total + 1;
                  }
                  return total;
                }, 0);

                return (
                  <div
                    className="flex justify-between items-center bg-[#222131] h-[13%] rounded-xl p-3 "
                    key={index}
                  >
                    <p className="w-3/12">
                      {Object.keys(infoFreelancer[index])[0]}
                    </p>
                    <div className="w-3/12">
                      <p>Clasificados</p>
                      <p>
                        {LeadsChecked}/{totalLeadsAsignados}
                      </p>
                    </div>
                    <div className="w-3/12">
                      <p>Ventas</p>
                      <p>{LeadsVendidos}</p>
                    </div>
                    <p className="w-1/12">{index + 1}</p>
                    <p className="w-2/12">10</p>
                  </div>
                );
              })}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
