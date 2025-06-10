import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllCountries } from "../api/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Optional: Custom Arrows
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "-10px",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      padding: "10px",
    }}
  >
    <i className="bi bi-chevron-right text-white" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-10px",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      padding: "10px",
    }}
  >
    <i className="bi bi-chevron-left text-white" />
  </div>
);

function CountrySlider() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAllCountries()
      .then((res) => setCountries(res.data))
      .catch(console.error);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-white mt-2 rounded shadow p-3 position-relative">
      <h5 className="mb-4 text-center fw-semibold">🌍 Explore Countries</h5>
      <Slider {...settings}>
        {countries.map((country) => (
          <div key={country.cca3} className="px-2">
            <div className="card h-100 shadow-sm border-0 rounded text-center">
              <div className="card-body p-3">
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
                <h6 className="fw-bold mb-1">{country.name.common}</h6>
                <p className="text-muted small mb-1">
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </p>
                <p className="text-muted small">
                  <strong>Timezone:</strong> {country.timezones?.[0] || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CountrySlider;
