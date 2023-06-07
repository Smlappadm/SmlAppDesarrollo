import React from 'react';
import style from './Landing.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import { getEmployees, setRol, setAccess, getAllCorredores, getAllVendedores, getAllClevel, getAllLeader } from '../../redux/actions'
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

function Landing() {

	const user = useUser().user;
	const userEmail = user.emailAddresses[0].emailAddress;
	const employees = useSelector(state => state.employees);
	const dispatch = useDispatch();
	const role = useSelector(state => state.rol);
	const access = useSelector(state => state.isEmployee)
	const userImageUrl= user?.imageUrl
	const corredores = useSelector(state => state.corredores);
	const vendedores = useSelector(state => state.vendedores);
	const leader = useSelector(state => state.leader);
	const clevel = useSelector(state => state.clevel);
	const allEmployees = [...corredores, ...vendedores, ...clevel, ...leader]
	const selectedEmployee = allEmployees.find(employee => employee.email === userEmail);
	const isEmployeeReady = localStorage.getItem("isEmployeeReady");
	const roleReady = localStorage.getItem("roleReady");

	const isEmployee = () => {
		return employees.some(employees => employees.email === userEmail);
	}

	useEffect(() => {
		dispatch(getAllCorredores())
		dispatch(getAllVendedores())
		dispatch(getAllLeader())
		dispatch(getAllClevel())
		const fetchEmployees = async () => {
			try {
				const response = await axios.get('/employees');
				const employeesData = response.data;

				dispatch(getEmployees(employeesData));
				const employee = employeesData.find(employees => employees.email === userEmail);
				if (employee) {
					dispatch(setRol(employee.rol));
					dispatch(setAccess(isEmployee()))
				}
			} catch (error) {
				console.error('Error al obtener los empleados:', error);
			}
		};

		fetchEmployees();
	}, [dispatch, isEmployee()]);

	return (
		<>
			<Nav />
			<div className={style.container}>
				<div className='flex flex-col gap-5'>
					{isEmployeeReady
						?
						<div className={style.containerWellcome}>
							 {selectedEmployee?.photo ? <img className={style.imagen} src={selectedEmployee.photo} alt="" />  : <img className={style.imagen} src={userImageUrl} alt="" /> }
							<h1 className={style.wellcome}>Bienvenido {user.fullName} </h1>
							<h3 className={style.role}>rol: {roleReady} </h3>
						</div>
						:
						<h1 className={style.notWellcome}>entrada no autorizada</h1>
					}
				</div>
			</div>
		</>
	);
}

export default Landing;