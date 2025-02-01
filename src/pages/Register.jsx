  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import TextInput from "../components/TextInput";
import toast from "react-hot-toast";
import { apiClient } from "../services/WebClient";
import { ClipLoader } from "react-spinners";

const Register = () => {
  
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

    const [errors, setErrors] = useState({
      username: "",
      password: "",
    });

    const handleValidation = (name, value) => {
      let errorMessage = "";

      switch (name) {
        case "username":
          if (!value.trim()) {
            errorMessage = "Username is required.";
          }
          break;
        case "password":
          if (!value.trim()) {
            errorMessage = "Password is required.";
          } else if (value.length < 6) {
            errorMessage = "Password must be at least 6 characters.";
          }
          break;
        default:
          break;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
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

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (errors.username || errors.password) {
        return;
      }

    setLoading(true);

      try {
        const response = await apiClient("/api/auth/register","post", {
          username: formData.username,
          password: formData.password,
        });
         setLoading(false);
         if (response.data.success) {
           navigate("/login");
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
              Register to Your Account
            </h2>
            <form onSubmit={handleSubmit}>
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
                  {loading ? <ClipLoader color="#ffffff" size={20} /> : "Register"}
                </button>
              </div>
            </form>
            <p className="mt-8 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline text-sm"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default Register;
