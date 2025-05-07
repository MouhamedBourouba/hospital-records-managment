import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs/Input";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!(email)) {
      setError("Please enter a valid email addresss.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axoisInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email,
        password: password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        switch (response.data.organizationType) {
          case "Hospital":
            navigate("/hospital/death-records");
            break;
          case "ASP":
            navigate("/asp/death-records");
            break
          case "DSP":
            navigate("/dsp/death-records");
            break
          case "RSH":
            navigate("/rsh/death-records");
          default:
            break;
        }

      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="w-[100%] w h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email address"}
            placeholder={"name@gmail.com"}
            type={"email"}
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"Min 8 Characters"}
            type={"password"}
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
