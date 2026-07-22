import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import { getFeedbacks } from "../services/adminService";

export default function FeedbackReports() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await getFeedbacks();

      setFeedbacks(data || []);

      if (data.length > 0) {
        const total = data.reduce(
          (sum, item) => sum + item.rating,
          0
        );

        setSummary({
          averageRating: (total / data.length).toFixed(1),
          totalReviews: data.length,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredFeedbacks = feedbacks.filter((item) => {
    const matchesSearch =
      item.clientName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.plannerName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === "All" ||
      item.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Feedback & Reports
        </h1>

        <p className="mt-2 text-gray-500">
          View customer reviews and planner ratings.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="bg-white rounded-xl shadow border p-6">
          <p className="text-gray-500 text-sm">
            Average Rating
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            ⭐ {summary.averageRating}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <p className="text-gray-500 text-sm">
            Total Reviews
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {summary.totalReviews}
          </h2>
        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow border p-5">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search client or planner..."
            />
          </div>

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Star</option>
            <option value="4">4 Star</option>
            <option value="3">3 Star</option>
            <option value="2">2 Star</option>
            <option value="1">1 Star</option>
          </select>

        </div>

      </div>

      {/* Feedback List */}

      <div className="space-y-4">

        {filteredFeedbacks.length === 0 ? (

          <EmptyState message="No feedback available." />

        ) : (

          filteredFeedbacks.map((feedback) => (

            <div
              key={feedback.id}
              className="bg-white rounded-xl shadow border p-5"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-lg font-semibold">
                    {feedback.clientName}
                  </h3>

                  <p className="text-gray-500">
                    Planner : {feedback.plannerName}
                  </p>

                </div>

                <div className="text-yellow-500 font-bold text-lg">
                  ⭐ {feedback.rating}
                </div>

              </div>

              <p className="mt-4 text-gray-700">
                {feedback.comment}
              </p>

              <p className="mt-3 text-sm text-gray-400">
                {feedback.date}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}