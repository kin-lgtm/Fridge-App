import React, { useState } from "react";
import axios from "axios";

const FridgeForm = ({ fetchItems }) => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Validation: Ensure all fields are filled
    if (!name.trim() || !expiryDate) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true); // Start loading state
      await axios.post("http://localhost:5000/api/FridgeItems", { name, expiryDate });

      if (fetchItems) {
        fetchItems(); // Refresh the fridge list if provided
      }

      // Reset form fields
      setName("");
      setExpiryDate("");
    } catch (err) {
      // Handle error and provide feedback
      setError("Failed to add the item. Please try again.");
      console.error("Error adding item:", err);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Good Morning, Johny!
        </h1>
        <p className="text-center text-gray-600 mt-2">
          <span className="mr-2">🌞</span>Don't forget to go shopping before Friday!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          {/* Name Input */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <label htmlFor="name" className="text-sm text-gray-600">
              <span className="mr-2">🏷️</span>
                Item Name
              </label>
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
              required
            />
          </div>

          {/* Expiry Date Input */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <label htmlFor="expiryDate" className="text-sm text-gray-600">
              <span className="mr-2">📅</span>
                Expiry Date
              </label>
            </div>
            <input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Adding..." : "ADD TO FRIDGE"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-3 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Instructional Message */}
        <div className="mt-3">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span className="text-purple-400">▲</span>
            Make sure no duplicate items exist in the fridge!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FridgeForm;
