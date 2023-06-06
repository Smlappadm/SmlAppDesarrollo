import { useSelector } from "react-redux";
import CustomizedButtons from "./Material UI/loginButton";

function Login() {
  const access = useSelector((state) => state.isEmployee);
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center'>
      <img src="https://i.postimg.cc/Kvj4Yr5X/White-Logo-Social-Media-Lab.webp" />
      <a className="" href="/protected">
        <CustomizedButtons />
      </a>
    </div>
  );
}

export default Login;
