import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.service";

function Home() {

  const nav = useNavigate();

  const { user, setUser } = useAuth();


  const handleLogout = async () => {
    try {

      await logout();

      setUser(null);

      nav("/login");

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6">

        <button
          onClick={() => nav("/")}
          className="
          text-2xl
          font-bold
          text-indigo-700
          hover:text-indigo-900
          "
        >
          ExpenseTracker
        </button>


        <div className="flex items-center gap-5">

          {
              user ? (

              <>

              <button
              onClick={() => nav("/dashboard")}
              className="
              text-gray-700
              hover:text-indigo-600
              font-medium
              "
              >

              Dashboard

              </button>


              <span className="text-gray-700">

              Welcome

              <span className="ml-2 font-semibold">

              {user?.fullname}

              </span>

              </span>


              <button

              onClick={handleLogout}

              className="
              bg-red-500
              text-white
              px-5
              py-2
              rounded-xl
              hover:bg-red-600
              "

              >

              Logout

              </button>

              </>

              ) : (

              <>

                <button

                  onClick={() => nav("/login")}

                  className="
                  text-gray-700
                  hover:text-indigo-600
                  "

                >

                  Login

                </button>


                <button

                  onClick={() => nav("/register")}

                  className="
                  bg-indigo-600
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  hover:bg-indigo-700
                  "

                >

                  Register

                </button>

              </>

            )

          }

        </div>

      </nav>


      {/* Hero */}

      <section className="max-w-7xl mx-auto px-10 py-20">

        <div className="grid md:grid-cols-2 items-center gap-16">

          <div>

            <p className="text-indigo-600 font-semibold mb-4">

              Manage Money Better

            </p>


            <h1 className="text-6xl font-bold leading-tight text-gray-900">

              Track Every

              <span className="text-indigo-600">

                {" "}Expense

              </span>

              <br />

              Build Better Habits

            </h1>


            <p className="mt-8 text-gray-600 text-lg">

              Organize income,
              monitor expenses,
              and understand your spending.

            </p>


            <div className="mt-10 flex gap-4">

              <button

                onClick={() => nav("/register")}

                className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                "

              >

                Get Started

              </button>


              <button

                onClick={() => nav("/login")}

                className="
                border
                border-gray-300
                px-8
                py-4
                rounded-2xl
                hover:bg-white
                "

              >

                Sign In

              </button>

            </div>

          </div>



          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <div className="mb-8">

                <p className="text-gray-500">

                  Monthly Spending

                </p>

                <h2 className="text-5xl font-bold mt-2">

                  ₹14,250

                </h2>

              </div>


              <div className="space-y-5">

                <div className="bg-indigo-50 p-5 rounded-xl">

                  🍔 Food — ₹4,200

                </div>


                <div className="bg-cyan-50 p-5 rounded-xl">

                  🚕 Transport — ₹2,100

                </div>


                <div className="bg-pink-50 p-5 rounded-xl">

                  🛍 Shopping — ₹3,850

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* Features */}

      <section className="max-w-6xl mx-auto pb-24">

        <h2 className="text-center text-4xl font-bold mb-14">

          Why Use ExpenseTracker?

        </h2>


        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow">

            <h3 className="text-2xl mb-4">

              📊 Analytics

            </h3>

            <p className="text-gray-600">

              Understand where your money goes.

            </p>

          </div>


          <div className="bg-white p-8 rounded-3xl shadow">

            <h3 className="text-2xl mb-4">

              💸 Smart Tracking

            </h3>

            <p className="text-gray-600">

              Record every transaction instantly.

            </p>

          </div>


          <div className="bg-white p-8 rounded-3xl shadow">

            <h3 className="text-2xl mb-4">

              📅 Monthly Reports

            </h3>

            <p className="text-gray-600">

              Visual summaries of spending.

            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Home;
