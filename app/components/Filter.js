"use client";
import { useState } from "react";

export default function Filters({ onFilter }) {
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");

  const applyFilters = () => {
    console.log('Filters Applied: ', {status, species});
    onFilter({ status, species });
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex space-x-4">
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="cursor-pointer p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          onChange={(e) => setSpecies(e.target.value)}
          className="cursor-pointer p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={species}
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>

        <button
          onClick={applyFilters}
          className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}