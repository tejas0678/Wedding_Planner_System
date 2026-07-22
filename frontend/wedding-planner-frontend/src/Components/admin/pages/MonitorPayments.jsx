import { useEffect, useState } from 'react';
import { CreditCard, Clock, XCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getPayments } from '../services/adminService';

export default function MonitorPayments() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    failedAmount: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    getPayments().then((data) => {
      setPayments(data);
      // Compute summary from data
      let totalRev = 0, pendingAmt = 0, failedAmt = 0;
      data.forEach((p) => {
        if (p.status === 'Paid') totalRev += p.amount;
        else if (p.status === 'Pending') pendingAmt += p.amount;
        else if (p.status === 'Failed') failedAmt += p.amount;
      });
      setSummary({
        totalRevenue: totalRev,
        pendingAmount: pendingAmt,
        failedAmount: failedAmt,
        totalPayments: data.length,
      });
    });
  }, []);

  const summaryCards = [
    { title: 'Total Revenue', value: `₹${summary.totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-green-600' },
    { title: 'Pending Amount', value: `₹${summary.pendingAmount.toLocaleString()}`, icon: Clock, color: 'text-yellow-600' },
    { title: 'Failed Amount', value: `₹${summary.failedAmount.toLocaleString()}`, icon: XCircle, color: 'text-red-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monitor Payments</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wedding ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wedding Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center">
                  <EmptyState message="No payments found" />
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-4 text-sm text-gray-900">{payment.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{payment.weddingId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{payment.client}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{payment.weddingDate}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-4"><StatusBadge status={payment.status} /></td>
                  <td className="px-4 py-4 text-sm text-gray-500">{payment.paymentDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}