import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import { getPackages } from "../services/adminService";

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data || []);
    } catch (error) {
      console.error(error);
      setPackages([]);
    }
  };

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Packages
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage all wedding packages.
          </p>
        </div>

        <button
          className="mt-4 md:mt-0 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-lg transition"
        >
          Add Package
        </button>

      </div>

      {/* Packages */}

      {packages.length === 0 ? (

        <EmptyState message="No packages available." />

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {packages.map((pkg) => (

            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow border border-gray-200 p-6 hover:shadow-lg transition"
            >

              <h2 className="text-xl font-semibold text-gray-800">
                {pkg.name}
              </h2>

              <p className="mt-3 text-gray-600">
                {pkg.description}
              </p>

              <div className="mt-4">

                <p className="text-2xl font-bold text-rose-600">
                  ₹{pkg.price}
                </p>

              </div>

              <div className="mt-5">

                <h3 className="font-semibold text-gray-700 mb-2">
                  Features
                </h3>

                <ul className="space-y-2">

                  {pkg.features &&
                    pkg.features.map((feature, index) => (

                      <li
                        key={index}
                        className="text-gray-600 text-sm"
                      >
                        • {feature}
                      </li>

                    ))}

                </ul>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}