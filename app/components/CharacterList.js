"use client";
import { useQuery } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";
import client from "../lib/apolloClient";
import { FETCH_CHARACTERS } from "../graphql/queries";
import Filters from "./Filter";
import Sort from "./Sort";
import Footer from "./Footer";
import { translate } from "../utils/translate";
import CharacterCard from "./CharacterCard";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const color = "#ffffff";

export default function CharacterList() {
  const [state, setState] = useState({
    page: 1,
    filter: { status: "", species: "" },
    characters: [],
    sortConfig: { key: "name", order: "asc" },
    language: "en",
  });

  const { page, filter, characters, sortConfig, language } = state;

  const switchLanguage = () => {
    setState((prevState) => ({
      ...prevState,
      language: language === "en" ? "de" : "en",
    }));
  };

  const { loading, error, data, fetchMore } = useQuery(FETCH_CHARACTERS, {
    variables: { page, ...filter },
    client,
  });

  // Function to remove duplicate characters
  const mergeUniqueCharacters = (existing, incoming) => {
    const uniqueCharacters = new Map();
    [...existing, ...incoming].forEach((char) => uniqueCharacters.set(char.id, char));
    return Array.from(uniqueCharacters.values());
  };

  // Update characters when new data is fetched
  useEffect(() => {
    if (data?.characters?.results) {
      setState((prevState) => ({
        ...prevState,
        characters:
          page === 1
            ? data.characters.results
            : mergeUniqueCharacters(prevState.characters, data.characters.results),
      }));
    }
  }, [data]);

  const handleFilterChange = (newFilter) => {
    setState((prevState) => ({
      ...prevState,
      filter: newFilter,
      page: 1,
      characters: [],
    }));
  };

  const handleSortChange = () => {
    setState((prevState) => ({
      ...prevState,
      sortConfig: {
        ...prevState.sortConfig,
        order: prevState.sortConfig.order === "asc" ? "desc" : "asc",
      },
    }));
  };

  const handleSortByChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      sortConfig: { key: event.target.value, order: "asc" },
    }));
  };

  // Memoize sorted characters to avoid unnecessary sorting on every render
  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => {
      const valueA = sortConfig.key === "name" ? a.name : a.origin.name;
      const valueB = sortConfig.key === "name" ? b.name : b.origin.name;
      return sortConfig.order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [characters, sortConfig]);


  const loadMore = () => {
    fetchMore({
      variables: { page: page + 1, ...filter },
    }).then((newData) => {
      setState((prevState) => ({
        ...prevState,
        page: page + 1,
        characters: mergeUniqueCharacters(prevState.characters, newData.data.characters.results),
      }));
    });
  };

  // Infinite Scroll with Debounce (to prevent multiple calls)
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 100
        ) {
          loadMore();
        }
      }, 300); // Debounce time
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [page, filter]);

  // if (loading && page === 1) return <p className="text-center">Loading...</p>;

  // if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (loading && page === 1) {
    return (
      <div className="text-center">
        <div className="spinner">Loading...</div> {/* Use a loading spinner */}
        <ClipLoader
         color={color}
         loading={loading}
         cssOverride={override}
         size={150}
         aria-label="Loading Spinner"
         data-testid="loader"
        />
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner">Loading more...</div> {/* Indicate more data is loading */}
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">Oops! Something went wrong. Please try again.</p>
        <button
          onClick={() => window.location.reload()} // Simple retry mechanism
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (!loading && !characters.length) {
    return (
      <div className="text-center">
        <p>No characters found. Try adjusting your filters.</p>
      </div>
    );
  }
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4 text-white">
        {translate("title", language)}
      </h1>

      {/* Filter & Sorting div */}
      <div className="flex justify-between items-center mb-4 bg-gray-800 p-3 rounded-lg">
        {/* Filtering (Left Side) */}
        <div className="flex gap-2">
          <Filters onFilter={handleFilterChange} />
        </div>

        {/* Sorting (Right Side) */}
        <Sort
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
          onSortByChange={handleSortByChange}
          language={language}
        />
      </div>

      {/* Characters */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sortedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} language={language} />
        ))}
      </div>

      {/* Show loading text when fetching more */}
      {loading && <p className="text-center mt-4">{translate("loading", language)}</p>}

      <Footer language={language} switchLanguage={switchLanguage} />
    </div>
  );
}