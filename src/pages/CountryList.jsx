import React, { useEffect, useState } from "react";
import { getAllCountries } from "../api/api";
import { Link } from "react-router-dom";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllCountries();
        if (response?.data) {
          setCountries(response.data);
        } else {
          throw new Error("No data received from API");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch countries. Please try again.");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
  };

  const filteredCountries = countries.filter((country) => {
    const name = country.name?.common || "";
    const capital = country.capital?.[0] || "";
    const region = country.region || "";
    const languages = country.languages
      ? Object.values(country.languages).join(" ")
      : "";
    const fullText = `${name} ${capital} ${region} ${languages}`.toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => window.location.reload()}
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold display-6">
        🌍 Explore Countries of the World
      </h1>

      {/* Search Bar */}
      <div className="mb-4 col-md-8 mx-auto">
        <div className="input-group shadow-sm rounded">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country, capital, region or language..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          {inputValue && (
            <button className="btn btn-outline-secondary" onClick={handleClear}>
              ❌
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSearch}>
            🔍 Search
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredCountries.length === 0 ? (
        <div className="alert alert-warning text-center">
          <strong>No countries found</strong> matching your search.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredCountries.map((country) => (
            <div key={country.cca3} className="col">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div
                  className="d-flex align-items-center justify-content-center bg-light rounded-top"
                  style={{ height: "160px", padding: "1rem" }}
                >
                  <img
                    src={country.flags?.png || country.flags?.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="img-fluid"
                    style={{ maxHeight: "100%", objectFit: "contain" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x100?text=No+Flag";
                      e.target.style.objectFit = "cover";
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-semibold">
                    {country.name.common}
                  </h5>
                  <ul className="list-unstyled text-muted small">
                    <li>
                      <strong>🌍 Region:</strong> {country.region || "N/A"}
                    </li>
                    <li>
                      <strong>🏙️ Capital:</strong>{" "}
                      {country.capital?.[0] || "N/A"}
                    </li>
                    <li>
                      <strong>🗣️ Languages:</strong>{" "}
                      {country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"}
                    </li>
                  </ul>
                  <Link
                    to={`/countries/${country.cca3}`}
                    className="btn btn-sm btn-outline-primary w-100"
                  >
                    🔎 Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryList;
