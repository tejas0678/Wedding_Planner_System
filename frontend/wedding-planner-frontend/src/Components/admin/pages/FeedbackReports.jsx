import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { getFeedback } from '../services/adminService';

export default function FeedbackReports() {
  const [feedback, setFeedback] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState(0);

  useEffect(() => {
    getFeedback().then((data) => setFeedback(data));
  }, []);

  const averageRating = feedback.length
    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
    : 0;

  const filtered = feedback.filter((f) => {
    const matchSearch = f.client.toLowerCase().includes(search.toLowerCase()) ||
                        f.planner.toLowerCase().includes(search.toLowerCase());
    const matchRating = filterRating === 0 || f.rating === filterRating;
    return matchSearch && matchRating;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feedback & Reports</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="text-2xl font-semibold">{averageRating} ★</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-2xl font-semibold">{feedback.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by client or planner..." />
        </div>
        <div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★ (4)</option>
            <option value={3}>★★★ (3)</option>
            <option value={2}>★★ (2)</option>
            <option value={1}>★ (1)</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState message="No feedback found" />
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.client}</h3>
                  <p className="text-sm text-gray-500">{item.planner}</p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{item.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{item.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}