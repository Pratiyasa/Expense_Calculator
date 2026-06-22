import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);

      setUser(res.data.user);

      nav("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center">

        <div className="max-w-md">

          <h1 className="text-6xl font-bold mb-6">
            ExpenseTracker
          </h1>

          <p className="text-xl text-indigo-100">

            Track spending, manage income,
            and understand your financial habits.

          </p>

        </div>

      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-slate-50">

        <form
          onSubmit={submit}
          className="bg-white p-10 rounded-3xl shadow-xl w-[420px]"
        >

          <h2 className="text-4xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to continue
          </p>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-indigo-600
                text-white
                p-4
                rounded-xl
                hover:bg-indigo-700
                transition
              "
            >
              Login
            </button>

          </div>

          <p className="mt-6 text-center text-gray-500">

            New here?

            <button
              type="button"
              onClick={() => nav("/register")}
              className="
                text-indigo-600
                ml-2
                font-semibold
              "
            >
              Create Account
            </button>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;