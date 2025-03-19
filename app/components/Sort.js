import React from "react";

export default function Sort({ sortConfig, onSortChange, onSortByChange }) {
  return (
    <div className="flex gap-2">
      {/* Sort By Dropdown */}
      <select
        value={sortConfig.key}
        onChange={onSortByChange}
        className="px-2 py-1 border rounded bg-gray-700 text-white"
      >
        <option value="name">Sort by Name</option>
        <option value="origin">Sort by Origin</option>
      </select>

      {/* Sort Order Button */}
      <button
        onClick={onSortChange}
        className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800"
      >
        {sortConfig.order === "asc" ? "⬆️ A-Z" : "⬇️ Z-A"}
      </button>
    </div>
  );
}