export default function EmptyState({ message = 'No data available' }) {
  return (
    <div className="text-center py-10 text-gray-500">
      <p>{message}</p>
    </div>
  );
}