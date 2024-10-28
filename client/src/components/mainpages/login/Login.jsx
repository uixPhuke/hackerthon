import  { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { API_URL } from "../../../Config";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [modalContent, setModalContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/user/login`, { ...user },{withCredentials:true});

      localStorage.setItem("firstLogin", true);
      setModalContent("Login successful!");
      setIsModalVisible(true);
      window.location.href = "/";
setTimeout(() => {
  setIsModalVisible(false);
  
}, 2000);
      
    } catch (err) {
      // alert(err.response.data.msg);
      setModalContent(err.response.data.msg || "Login failed");
      setIsModalVisible(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-6">
      <div className=" flex flex-col md:flex-row h-screen bg-gray-50">
        {/* Left side - Welcome Back */}
        <div className=" sm:p-6 md:w-1/2 flex flex-col justify-center items-center bg-black text-white p-10">
          <h2 className="text-3xl font-semibold mb-4">Hey There!</h2>
          <p className="mb-8 text-center">
            Don,t have an account ! You can Create
          </p>
          <Link
            to="/register"
            className="bg-white text-black font-bold py-2 px-6 rounded-full transition duration-300 hover:bg-slate-400 hover:text-white"
          >
            Sign Up
          </Link>
        </div>

        {/* Right side - Login */}
        <div className="md:w-1/2 flex justify-center items-center p-10">
          <form
            onSubmit={loginSubmit}
            className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md p-10 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-semibold text-zinc-500 mb-6">Login</h2>

            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={user.email}
                onChange={onChangeInput}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="relative mb-6">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                value={user.password}
                onChange={onChangeInput}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 rounded-md transition duration-300 hover:bg-slate-400 flex items-center justify-center"
            >
              <FaLock className="mr-2" />
              Login
            </button>

            <p className="text-center mt-4 text-gray-600">
              Don,t have an account?{" "}
              <Link
                to="/register"
                className="text-gray-400 font-bold hover:underline hover:text-black"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Modal Popup */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-2xl font-semibold mb-4">{modalContent}</h3>
            <button
              onClick={() => setIsModalVisible(false)}
              className="mt-4 bg-teal-400 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-teal-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
