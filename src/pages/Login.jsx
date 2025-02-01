import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import toast from "react-hot-toast";
import { apiClient } from "../services/WebClient";
import {ClipLoader} from "react-spinners"

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleValidation = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Username is required.";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    handleValidation(name, value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (errors.username || errors.password) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient("/api/auth/login", "post", {
        username: formData.username,
        password: formData.password,
      });
      setLoading(false);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        navigate("/editor");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      setLoading(false);
      const message =
        err.response?.data?.message ||
        "Something Went Wrong. Please Try Again Later.";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="rounded-md w-[70%] flex justify-center shadow-lg">
        <div className="max-w-md w-full p-12 rounded-lg bg-primary-hover">
          <h2 className="text-3xl font-bold text-center mb-10">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin}>
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="Username*"
              onChange={handleInputChange}
              value={formData.username}
              classes={`rounded-none ${
                errors.username
                  ? "border border-red-500 bg-red-50"
                  : "ring-1 ring-inset ring-gray-300"
              }`}
              error={errors.username}
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Password*"
              onChange={handleInputChange}
              value={formData.password}
              classes={`mt-8 rounded-none ${
                errors.password
                  ? "border border-red-500 bg-red-50"
                  : "ring-1 ring-inset ring-gray-300"
              }`}
              error={errors.password}
            />
            <div className="text-center">
              <button
                type="submit"
                className={`w-1/2 bg-gradient-to-r from-blue-300 via-cyan-400 to-teal-400 hover:bg-green-600 text-white py-3 rounded-md font-medium transition duration-200 mt-6 ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={loading}
              >
                {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-8 flex items-center justify-center text-sm">
            Don&apos;t have an account yet?{" "}
            <Link to="/register" className="text-sm text-blue-600 underline">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
