import Nav from "../../components/Nav/Nav";
import Detail from "../../components/Lideres/Employees/Detail/Detail";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCorredores, getAllVendedores, getAllClevel, getAllLeader } from "../../redux/actions";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { Image } from 'cloudinary-react';
import Countries from "../../components/Select/SelectionCountries";
import axios from "axios";
import styles from "./Settings.module.css";

const { VITE_CLOUND_NAME } = import.meta.env;

export default function Settings() {
  const user = useUser().user;
  const userImageUrl = user?.imageUrl;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const corredores = useSelector(state => state.corredores);
  const vendedores = useSelector(state => state.vendedores);
  const leader = useSelector(state => state.leader);
  const clevel = useSelector(state => state.clevel);
  const dispatch = useDispatch();

  const allEmployees = [...corredores, ...vendedores, ...clevel, ...leader];
  const selectedEmployee = allEmployees.find(employee => employee.email === userEmail);

  const [formErrors, setFormErrors] = useState({
    birthdate: false,
    country: false,
    contactNumber: false,
    description: false,
  });

  const [formData, setFormData] = useState({
    birthdate: '',
    photo: userImageUrl,
    country: '',
    contactNumber: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contactNumber" && isNaN(value)) {
      return;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.birthdate === "" ||
      formData.country === "" ||
      formData.contactNumber === "" ||
      formData.description === ""
    ) {
      setFormErrors({
        birthdate: formData.birthdate === "",
        country: formData.country === "",
        contactNumber: formData.contactNumber === "",
        description: formData.description === "",
      });
      return;
    }

    axios.put(`${selectedEmployee.rol}/${selectedEmployee._id}`, formData)
      .then((response) => {
        setFormSubmitted(true);
        dispatch(getAllCorredores());
        dispatch(getAllVendedores());
        dispatch(getAllLeader());
        dispatch(getAllClevel());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = (imageUrl) => {
    setProfileImageUrl(imageUrl);
    setFormData(prevFormData => ({
      ...prevFormData,
      photo: imageUrl,
    }));
  };

  useEffect(() => {
    dispatch(getAllCorredores());
    dispatch(getAllVendedores());
    dispatch(getAllLeader());
    dispatch(getAllClevel());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center w-full">
        <div className="h-screen w-4/5 flex flex-col justify-start items-center p-8">
          <div>
            <h2 className={styles.title}>settings</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className={styles.inputStyles}
                placeholder="Fecha de nacimiento"
              />
              {formErrors.birthdate && <span className={styles.error}>Ingrese la fecha de nacimiento</span>}

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={styles.inputStyles}
              >
                <option value="">Seleccionar país</option>
                {Countries.map((country, index) => (
                  <option className={styles.inputStylesTwo} key={index} value={country}>{country}</option>
                ))}
              </select>
              {formErrors.country && <span className={styles.error}>Ingrese el país</span>}

              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={styles.inputStyles}
                placeholder="Número de contacto"
              />
              {formErrors.contactNumber && <span className={styles.error}>Ingrese el número de contacto</span>}

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.inputStyles}
                placeholder="Descripción"
              />
              {formErrors.description && <span className={styles.error}>Ingrese la descripción</span>}

              <div className={styles.pictureInput} >
                <UploadWidget onImageUpload={handleImageUpload} />
                {profileImageUrl && (
                  <Image name="photo" onChange={handleChange} value={profileImageUrl} cloudName={VITE_CLOUND_NAME} publicId={profileImageUrl} className={styles.picture} />
                )}
              </div>

              <button type="submit" className={styles.button}>Enviar</button>
            </form>
          </div>
        </div>
        <Detail
          key={formSubmitted ? "submitted" : "not-submitted"}
          name={user?.fullName}
          picture={selectedEmployee?.photo ? selectedEmployee?.photo : userImageUrl}
          email={user?.emailAddresses[0].emailAddress}
          contactNumber={selectedEmployee?.contactNumber}
          description={selectedEmployee?.description}
          country={selectedEmployee?.country}
          birthdate={selectedEmployee?.birthdate && selectedEmployee?.birthdate.substring(0, 10)}
        />
      </div>
    </>
  );
}