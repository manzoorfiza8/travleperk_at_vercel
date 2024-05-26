import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import './register.css'


import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
const Register = () => {
	const [credentials, setCredentials] = useState({
		username: undefined,
		email: undefined,
		isAdmin: false,
		password: undefined,
	});

	const { loading, error, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/auth/register", credentials);
			console.log(res.data)
			if (!res.data.isAdmin) {
				navigate("/login");
			} else {
				alert("you don't have access to this page")
			}
		} catch (err) {
			alert("server error"+err)
		}
	};	
	const handleBack = () => {
		navigate(-1);
	}
	useEffect(()=>{
		console.log(document.body)
	},[])
	return (
		<div className="bg-cover bg-fixed bg-no-repeat md:flex md:pl-20 py-8" style={{ backgroundImage: 'url(https://images.pexels.com/photos/4721577/pexels-photo-4721577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
			<div className="min-h-screen">
				<button className="back" onClick={handleBack}><img src="/images/back.png" alt="back" /></button>
				<div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md p-8 md:pr-20 rounded-lg shadow-lg">
					<h1 className="text-4xl font-bold border-b-4 pb-4 mb-8" style={{borderColor:"#0071c2"}}>Create An Account</h1>
					<div className="mb-4">
						<div className="flex items-center border-b border-black">
							<i className="fas fa-user w-8 text-center"></i>
							<input className="text-black bg-transparent outline-none w-11/12 text-lg border-none" type="text" placeholder="Username" style={{border:"none"}} id="username"
                            name="username"
                            onChange={handleChange}/>
						</div>
						<div className="flex items-center border-b border-black mt-4">
							<i className="fas fa-envelope w-8 text-center"></i>
							<input className="text-black bg-transparent outline-none w-11/12 text-lg border-none" type="email" placeholder="Email" style={{border:"none"}} id="email"
                            name="email"
                            onChange={handleChange}/>
						</div>
						<div className="flex items-center border-b border-black mt-4">
							<i className="fas fa-lock w-8 text-center"></i>
							<input className="text-black bg-transparent outline-none w-11/12 text-lg border-none" type="password" placeholder="Password" style={{border:"none"}} id="password"
                            name="password"
                            onChange={handleChange}/>
						</div>
						<div className="flex items-center border-b border-black mt-4">
							<i className="fas fa-lock w-8 text-center"></i>
							<input className="text-black bg-transparent w-11/12 text-lg border-none" type="password" placeholder="Confirm Password" style={{border:"none"}}/>
						</div>
					</div>
					<div className="mb-4 text-sm chbx">
						<input type="checkbox" className="chbox"/>
						<span className="text-black">Accept our policies and terms of services</span>
					</div>

					<div className="text-center">
						<button className="text-white bg-blue-400 px-6 py-2 text-lg rounded-md hover:bg-blue-500" disabled={loading} onClick={handleClick}>Sign in</button>
						{error && <span>{error.message}</span>}
					</div>
					<div className="mt-8 flex justify-center items-center">
						<p className="text-sm text-black">Already have an account?</p>
						<Link to={'/login'} className="text-lg text-blue-500 ml-2 cursor-pointer hover:underline">Sign up</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;