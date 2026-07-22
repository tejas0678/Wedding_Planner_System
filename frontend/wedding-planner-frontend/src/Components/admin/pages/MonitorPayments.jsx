import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { getPayments } from "../services/adminService";

export default function MonitorPayments() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    failedAmount: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const data = await getPayments();

    setPayments(data);

    let totalRevenue = 0;
    let pendingAmount = 0;
    let failedAmount = 0;

    data.forEach((payment) => {
      if (payment.status === "Paid") {
        totalRevenue += payment.amount;
      } else if (payment.status === "Pending") {
        pendingAmount += payment.amount;
      } else if (payment.status === "Failed") {
        failedAmount += payment.amount;
      }
    });

    setSummary({
      totalRevenue,
      pendingAmount,
      failedAmount,
      totalPayments: data.length,
    });
  };

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${summary.totalRevenue.toLocaleString()}`,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Pending Amount",
      value: `₹${summary.pendingAmount.toLocaleString()}`,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Failed Amount",
      value: `₹${summary.failedAmount.toLocaleString()}`,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Total Payments",
      value: summary.totalPayments,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Monitor Payments
        </h1>
        <p className="text-gray-500 mt-1">
          Track all payment transactions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bg}`}
            >
              <div
                className={`w-5 h-5 rounded-full ${card.text.replace(
                  "text",
                  "bg"
                )}`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Payment ID
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Wedding ID
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Client
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Wedding Date
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Payment Date
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <EmptyState message="No payments found." />
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">{payment.id}</td>
                  <td className="px-5 py-4">{payment.weddingId}</td>
                  <td className="px-5 py-4">{payment.client}</td>
                  <td className="px-5 py-4">
                    {payment.weddingDate}
                  </td>
                  <td className="px-5 py-4 font-semibold">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-5 py-4">
                    {payment.paymentDate}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}