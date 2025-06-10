import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../api/api";

function CountryDetail() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const response = await getCountryByCode(countryCode);
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        if (data) {
          setCountry(data);
        } else {
          throw new Error("Country not found");
        }
      } catch (err) {
        console.error("Error fetching country details:", err);
        setError(err.message || "Failed to fetch country details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading country details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm p-4 rounded">
          <h4 className="alert-heading">🚨 Error</h4>
          <p>{error}</p>
          <hr />
          <Link to="/countries" className="btn btn-outline-primary">
            ⬅️ Back to Country List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/countries" className="btn btn-outline-secondary mb-4">
        ⬅️ Back to Country List
      </Link>

      <div className="card shadow-lg border-0">
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center justify-content-center bg-light p-4">
            <img
              src={country.flags?.svg || country.flags?.png}
              alt={`Flag of ${country.name?.common}`}
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "contain" }}
              loading="lazy"
            />
          </div>
          <div className="col-md-7">
            <div className="card-body p-4">
              <h2 className="card-title fw-bold">{country.name?.common}</h2>
              <p className="text-muted mb-3">{country.name?.official}</p>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Region:</strong> {country.region || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Subregion:</strong> {country.subregion || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Population:</strong>{" "}
                  {country.population?.toLocaleString() || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Area:</strong>{" "}
                  {country.area?.toLocaleString() || "N/A"} km²
                </li>
                <li className="list-group-item">
                  <strong>Languages:</strong>{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Timezones:</strong>{" "}
                  {country.timezones?.join(", ") || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
