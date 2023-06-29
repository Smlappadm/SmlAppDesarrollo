import React, { useEffect, useState } from "react";
import FollowersDesktop from "./FollowersDesktop/FollowersDesktop";
import NameDesktop from "./NameDesktop/NameDesktop";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

export default function LandingClientDesktop({
  imgInstagram,
  setMaxNumber,
  numberTotal,
  name,
  setName,
  numberInstagram,
  numberTiktok,
  maxNumber,
}) {
  // const user = useUser().user;
  // const imgUser = user.imageUrl;

  // const { client } = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const userEmail = user.emailAddresses[0].emailAddress;
  // const [name, setName] = useState("");
  // const [loader, setLoader] = useState(false);
  // const [nameIG, setNameIG] = useState("");
  // const [imgInstagram, setImgInstagram] = useState(imgUser);
  // const [numberInstagram, setNumberInstagram] = useState(0);
  // const [numberTiktok, setNumberTiktok] = useState(3300);
  // const [numberTotal, setNumberTotal] = useState(2500);
  // const [maxNumber, setMaxNumber] = useState("10K");

  // useEffect(() => {
  //   dispatch(getClientByEmail(userEmail && userEmail));
  // }, [dispatch]);

  // useEffect(() => {
  //   setName(client.username);
  //   setNumberTotal(numberTiktok + numberInstagram);
  //   name && setLoader(true);
  // }, [client]);
  // useEffect(() => {
  //   loader && obtainMetricsInstagram();
  // }, [client]);

  // const obtainMetricsInstagram = async () => {
  //   const userIG = client && client.instagram.slice(26, -1);
  //   const response = await axios.get(
  //     `https://apiflask-td8y.onrender.com/obtener_info_instagram?username=${userIG}`
  //   );
  //   const infoIG = response.data;
  //   localStorage.setItem("instagram", userIG);
  //   setNumberInstagram(parseInt(infoIG.seguidores));
  //   console.log(infoIG);
  // };

  return (
    <div>
      <HeaderDesktop
        numberTotal={numberTotal}
        setMaxNumber={setMaxNumber}
        imgInstagram={imgInstagram}
      />
      <NameDesktop name={name} setName={setName} />
      <FollowersDesktop
        numberInstagram={numberInstagram}
        numberTiktok={numberTiktok}
        maxNumber={maxNumber}
      />
    </div>
  );
}
