import { useSelector } from 'react-redux';
import style from './Login.module.css';


function Login() {
	const access = useSelector(state => state.isEmployee);
	return (
		<div className={style.container}>
			<h1>SOCIAL MEDIA LAB</h1>
			<a className={style.loginbtn} href="/protected">ingresar</a>
		</div>
	);
}

export default Login;
