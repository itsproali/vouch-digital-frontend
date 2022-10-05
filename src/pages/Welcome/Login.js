import React, { useEffect, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BiLock } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Loading from "../../components/Loading/Loading";
import auth from "../../firebase-init";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import apiClient from "../../hooks/apiClient";

const Login = ({ setAuthentication }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [inputType, icon] = usePasswordToggle();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    const res = await apiClient.post("/user/get-token", {
      email: data.email,
    });
    const secret_token = res?.data?.token;
    setToken(secret_token);
    localStorage.setItem("token", secret_token);
  };

  const handleResetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: "Reset Password",
    });
    if (sending) {
      Swal.showLoading();
    }
    if (email) {
      Swal.fire("A reset link has been sent!");
      sendPasswordResetEmail(email);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  if (loading) {
    return <Loading />;
  }

  if (error || resetError) {
    Swal.fire("Error...!", "Something went wrong", "error");
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-neutral">Enter your Email and Password.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] sm:w-[75%]">
        {/* Email */}
        <div className="w-full relative">
          <HiOutlineMail className="absolute left-3 top-4 text-xl"></HiOutlineMail>
          <input
            type="email"
            placeholder="Your Email address"
            className="block p-3 pl-10 border focus:border-primary focus:outline-none w-full rounded-lg"
            {...register("email", {
              required: {
                value: true,
                message: "Please provide your email",
              },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="text-red-500 label-text-alt">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500 label-text-alt">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        {/* Password */}
        <div className="w-full relative">
          <BiLock className="absolute left-3 top-4 text-xl"></BiLock>
          <input
            type={inputType}
            placeholder="Password"
            className="block p-3 pl-10 border focus:border-primary focus:outline-none w-full rounded-lg"
            {...register("password", {
              required: {
                value: true,
                message: "Please enter your password",
              },
            })}
          />
          <span className="absolute top-4 right-3 cursor-pointer text-xl">
            {icon}
          </span>
          <label className="label">
            {errors.password?.type === "required" && (
              <span className="text-red-500 label-text-alt">
                {errors.password.message}
              </span>
            )}
            <span
              className="text-primary cursor-pointer text-xs hover:underline mb-2"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </span>
          </label>
        </div>

        <label htmlFor="submit">
          <input type="submit" value="" />
          <PrimaryButton className="w-full">Login</PrimaryButton>
        </label>
      </form>

      <p className="text-center mt-2 text-sm">
        Don't have an account?{" "}
        <button
          onClick={() => setAuthentication("register")}
          className="text-neutral link-hover"
        >
          Register Now{" "}
        </button>
      </p>
    </>
  );
};

export default Login;
