import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BiLock, BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import Swal from "sweetalert2";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Loading from "../../components/Loading/Loading";
import auth from "../../firebase-init";
import usePasswordToggle from "../../hooks/usePasswordToggle";

const Login = ({ setAuthentication }) => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [inputType, icon] = usePasswordToggle();

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data?.name });
    reset();
  };

  if (loading || updating) {
    return <Loading />;
  }

  if (error || updateError) {
    Swal.fire("Error...!", "Something went wrong", "error");
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-neutral">Create an account within few seconds.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] sm:w-[75%]">
        {/* Name */}
        <div className="w-full relative">
          <BiUser className="absolute left-3 top-4 text-xl"></BiUser>
          <input
            type="text"
            placeholder="Your Full Name"
            className="block p-3 pl-10 border focus:border-primary focus:outline-none w-full rounded-lg"
            {...register("name", {
              required: {
                value: true,
                message: "Please enter your Name",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="text-red-500 label-text-alt">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

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
          </label>
        </div>

        <label htmlFor="submit">
          <input type="submit" value="" />
          <PrimaryButton className="w-full">Register</PrimaryButton>
        </label>
      </form>

      <p className="text-center mt-2 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => setAuthentication("login")}
          className="text-neutral link-hover"
        >
          Login Now
        </button>
      </p>
    </>
  );
};

export default Login;
