import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InputNameEdit from "./InputNameEdit";
import InputPhoneEdit from "./InputPhoneEdit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import InputEmailEdit from "./InputEmailEdit";
import {
  getAllEmployees,
  getDetailEmploy,
} from "../../../../../../redux/actions";
import InputBirthdateEdit from "./InputBirthdateEdit";
import InputDescriptionEdit from "./InputDescriptionEdit";
import InputCountryEdit from "./InputCountryEdit";
import { TbPointFilled } from "react-icons/tb";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "30px",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModalDelete({
  inputName,
  inputEmail,
  itemRol,
  itemId,
  itemEmail,
  onModalClose,
  ErrorEmployees,
  BannedEmployees,
}) {
  const [open, setOpen] = useState(false);
  const role = useSelector((state) => state.rol);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = async () => {
    try {
      const response = await axios.put(
        `/${itemRol}/email/email/?email=${itemEmail}`,
        {
          deleted: true,
        }
      );
    } catch (error) {
      ErrorEmployees(inputName);
      console.log(`No se pudo enviar el baneado de ${itemRol} ${itemEmail} `);
    }

    try {
      const response = await axios.delete(`/employees/?email=${inputEmail}`);

      BannedEmployees(inputName);
      onModalClose();
    } catch (error) {
      console.log(`No se pudo enviar el baneado de ${itemRol} ${itemId} `);
    }

    dispatch(getAllEmployees());
    setOpen(false);
  };

  return (
    <React.Fragment>
      {role && role === "clevel" ? (
        <Button variant="contained" onClick={handleOpen}>
          Delete Employ
        </Button>
      ) : (
        ""
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <h2 id="child-modal-title">
            Seguro quieres eliminar a {inputName} ?
          </h2>

          <div className="flex mt-5 gap-2 justify-center items-center">
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="contained" onClick={handleCreate}>
              Eliminar empleado
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ChildModal({
  inputName,
  inputEmail,
  inputPhone,
  inputBirthdate,
  inputDescription,
  inputCountry,
  itemRol,
  itemEmail,
  onModalClose,
  EditEmployees,
  ErrorEditEmployees,
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    if (!inputName) {
      alert("El campo Name es requerido");
      setOpen(false);
      return;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!inputEmail || !emailRegex.test(inputEmail)) {
      alert("El campo Email debe ser un correo electrónico válido");
      setOpen(false);
      return;
    }

    try {
      if (itemRol === "clevel") {
        await axios.put(`/clevel/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });

        await axios.put(`/corredor/email/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });

        await axios.put(`/vendedor/email/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });
      }
      if (itemRol === "leader") {
        await axios.put(`/leader/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });

        await axios.put(`/corredor/email/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });

        await axios.put(`/vendedor/email/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });
      }

      if (itemRol === "vendedor") {
        await axios.put(`/vendedor/email/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });
      }

      if (itemRol === "corredor") {
        await axios.put(`/corredor/email/email/?email=${inputEmail}`, {
          name: inputName,
          email: inputEmail,
          contactNumber: inputPhone,
          birthdate: inputBirthdate,
          description: inputDescription,
          country: inputCountry,
        });
      }

      await axios.put(`/employees/email/?email=${inputEmail}`, {
        name: inputName,
        email: inputEmail,
        contactNumber: inputPhone,
        birthdate: inputBirthdate,
        description: inputDescription,
        country: inputCountry,
      });
      EditEmployees(inputName);
      onModalClose();
    } catch (error) {
      ErrorEditEmployees(inputName);
      console.log(`No se pudo enviar el post de ${itemRol}`);
    }

    dispatch(getAllEmployees());
    dispatch(getDetailEmploy(itemEmail));
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleOpen}>
        Actualizar
      </Button>
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "20%", backgroundColor: "#39394b" }}>
          <h2 id="child-modal-title">Confirm update of {inputName}?</h2>
          <div className="flex mt-5 gap-2 justify-center items-center">
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="contained" onClick={handleCreate}>
              Actualizar empleado
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModalEdit({
  itemId,
  itemName,
  itemEmail,
  itemPhone,
  itemBirthdate,
  itemDescription,
  itemCountry,
  itemRol,
  SendEmployees,
  BannedEmployees,
  ErrorEmployees,
  EditEmployees,
  ErrorEditEmployees,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [selectEmployees, setSelectEmployees] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputBirthdate, setInputBirthdate] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputCountry, setInputCountry] = useState("");

  const handleOpen = () => {
    setInputName(itemName);
    setInputEmail(itemEmail);
    setSelectEmployees(itemRol);
    setInputPhone(itemPhone);
    setInputBirthdate(itemBirthdate);
    setInputDescription(itemDescription);
    setInputCountry(itemCountry);
    setOpen(true);
  };

  return (
    <div>
      <Button className="text-3xl" onClick={handleOpen}>
        <TbPointFilled />
        <TbPointFilled />
        <TbPointFilled />{" "}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "30%",
            bgcolor: "#39394b",
          }}
        >
          <div>
            <div className="flex flex-col gap-5 my-5">
              <h2 id="parent-modal-title">Edit Employ {inputName}</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <InputNameEdit
                inputName={inputName}
                setInputName={setInputName}
              />
              <InputEmailEdit
                inputEmail={inputEmail}
                setInputEmail={setInputEmail}
              />
              <InputPhoneEdit
                inputPhone={inputPhone}
                setInputPhone={setInputPhone}
              />
              <InputCountryEdit
                inputCountry={inputCountry}
                setInputCountry={setInputCountry}
              />
              <InputBirthdateEdit
                inputBirthdate={inputBirthdate}
                setInputBirthdate={setInputBirthdate}
              />
              <InputDescriptionEdit
                inputDescription={inputDescription}
                setInputDescription={setInputDescription}
              />
              {/* <BasicSelect
                employees={selectEmployees}
                setEmployees={setSelectEmployees}
              /> */}
            </div>
          </div>
          <div className="flex mt-5 gap-3 justify-center items-center">
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
            <ChildModal
              inputName={inputName}
              inputEmail={inputEmail}
              selectEmployees={selectEmployees}
              inputPhone={inputPhone}
              inputBirthdate={inputBirthdate}
              inputDescription={inputDescription}
              inputCountry={inputCountry}
              itemRol={itemRol}
              itemId={itemId}
              itemEmail={itemEmail}
              EditEmployees={EditEmployees}
              ErrorEditEmployees={ErrorEditEmployees}
              onModalClose={handleClose}
            />
            <ChildModalDelete
              inputName={inputName}
              inputEmail={inputEmail}
              itemRol={itemRol}
              itemId={itemId}
              itemEmail={itemEmail}
              SendEmployees={SendEmployees}
              ErrorEmployees={ErrorEmployees}
              BannedEmployees={BannedEmployees}
              onModalClose={handleClose}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
