import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./register.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,   
    isAdmin: true,
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
      if (res.data.isAdmin) {
        navigate("/login");
      } else {
        alert("you don't have access to this page")
      }
    } catch (err) {
        alert("please enter the correct data")
    }
  };

  return (
    <div className="register">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
        <div className="flex">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
