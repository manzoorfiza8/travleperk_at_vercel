import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      // console.log("res",res.data.details._id)
      if (!res.data.details.isAdmin) {
        localStorage.setItem("userid",res.data.details._id)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="bg-cover bg-fixed bg-no-repeat md:flex md:pl-20" style={{ backgroundImage: 'url(https://images.pexels.com/photos/4721577/pexels-photo-4721577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <button className="back" onClick={handleBack}><img src="/images/back.png" alt="back" /></button>
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-md p-8 md:pr-20 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold border-b-4 pb-4 mb-8" style={{ borderColor: "#1e50fd" }}>Welcome Back!</h1>
            <div className="mb-4">
              <div className="flex items-center border-b border-black mt-4">
                <i className="fas fa-user w-8 text-center"></i>
                <input className="text-black bg-transparent outline-none w-11/12 text-lg border-none" type="text" placeholder="Username" style={{ border: "none" }} id="username"
                  name="username"
                  onChange={handleChange} />
              </div>
              <div className="flex items-center border-b border-black mt-4">
                <i className="fas fa-lock w-8 text-center"></i>
                <input className="text-black bg-transparent outline-none w-11/12 text-lg border-none" type="password" placeholder="Password" style={{ border: "none" }} id="password"
                  name="password"
                  onChange={handleChange} />
              </div>
            </div>

            <div className="text-center">
              <button className="text-white px-6 py-2 text-lg rounded-md hover:bg-blue-900" style={{ backgroundColor: "#1e50fd" }} disabled={loading} onClick={handleClick}>Sign Up</button>
              {error && <span>{error.message}</span>}
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="text-sm text-black">Already have an account?</p>
              <Link to={'/register'} className="text-lg ml-2 cursor-pointer hover:underline" style={{ color: "#1e50fd" }}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
