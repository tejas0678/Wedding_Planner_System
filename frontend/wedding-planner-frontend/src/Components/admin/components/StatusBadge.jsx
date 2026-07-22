const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-blue-100 text-blue-800',
  Rejected: 'bg-red-100 text-red-800',
  Completed: 'bg-purple-100 text-purple-800',
  Paid: 'bg-green-100 text-green-800',
  Failed: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status }) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {status}
    </span>
  );
}