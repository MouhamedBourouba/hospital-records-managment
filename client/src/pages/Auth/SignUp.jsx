import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { valideEmail } from "../../utils/helper";
import { Input } from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axoisInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter full name");
      return;
    }

    if (!valideEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // SignUp API Call
    try {
      // Upload image if present
      const response = await axoisInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        adminInviteToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={"Full Name"}
              placeholder={"John"}
              type={"text"}
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email Address"}
              placeholder={"john@example.com"}
              type={"text"}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
              placeholder={"Min 8 Characters"}
              type={"password"}
            />
            <Input
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              label={"Admin Invite Token"}
              placeholder={"6 Digit Code"}
              type={"text"}
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
