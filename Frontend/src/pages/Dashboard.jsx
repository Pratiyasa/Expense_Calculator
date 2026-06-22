import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white px-10 py-5 shadow flex justify-between">

        <h1 className="text-2xl font-bold text-indigo-700">
          ExpenseTracker
        </h1>

        <div>
          Welcome,
          <span className="font-bold ml-2">
            {user?.fullname}
          </span>
        </div>

      </nav>

      <div className="max-w-7xl mx-auto p-10">

        <h2 className="text-4xl font-bold mb-10">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-8 shadow">

            <p className="text-gray-500">
              Total Balance
            </p>

            <h3 className="text-4xl font-bold mt-3">
              ₹25,400
            </h3>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow">

            <p className="text-gray-500">
              Income
            </p>

            <h3 className="text-4xl font-bold text-green-600 mt-3">
              ₹40,000
            </h3>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow">

            <p className="text-gray-500">
              Expense
            </p>

            <h3 className="text-4xl font-bold text-red-500 mt-3">
              ₹14,600
            </h3>

          </div>

        </div>

        <div className="mt-10 bg-white rounded-3xl p-8 shadow">

          <h3 className="text-2xl font-bold mb-5">
            Recent Activity
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Food</span>
              <span>- ₹450</span>
            </div>

            <div className="flex justify-between">
              <span>Shopping</span>
              <span>- ₹1500</span>
            </div>

            <div className="flex justify-between">
              <span>Salary</span>
              <span>+ ₹30000</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
