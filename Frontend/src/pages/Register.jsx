import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(form);

      alert("Registration successful");

      nav("/login");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-600 to-indigo-700 items-center justify-center text-white">

        <div className="max-w-md">

          <h1 className="text-6xl font-bold mb-6">
            ExpenseTracker
          </h1>

          <p className="text-xl text-cyan-100">
            Start managing your finances in one place.
          </p>

        </div>

      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-slate-50">

        <form
          onSubmit={submit}
          className="bg-white rounded-3xl shadow-xl p-10 w-[430px]"
        >

          <h2 className="text-4xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Join ExpenseTracker
          </p>

          <div className="space-y-4">

            <input
              placeholder="Full Name"
              className="w-full border rounded-xl p-4"
              onChange={(e)=>
                setForm({
                  ...form,
                  fullname:e.target.value
                })
              }
            />

            <input
              placeholder="Username"
              className="w-full border rounded-xl p-4"
              onChange={(e)=>
                setForm({
                  ...form,
                  username:e.target.value
                })
              }
            />

            <input
              placeholder="Email"
              className="w-full border rounded-xl p-4"
              onChange={(e)=>
                setForm({
                  ...form,
                  email:e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl p-4"
              onChange={(e)=>
                setForm({
                  ...form,
                  password:e.target.value
                })
              }
            />

            <button
              className="
              w-full
              bg-indigo-600
              text-white
              rounded-xl
              p-4
              hover:bg-indigo-700
              "
            >
              Register
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Register;
