import React from "react";
import { Link } from "react-router-dom";
import CountrySlider from "../components/CountrySlider";

function Index() {
  return (
    <>
      {/* Hero Section */}
      <div className="min-vh-70 d-flex align-items-center justify-content-center bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">🏠 Welcome to Atlas React Home</h2>
              <p className="lead text-muted mb-4">
                Welcome to Atlas — where your journey across the world begins. From the majestic mountains to bustling cities, explore the rich cultures, stories, and landscapes of every country at your fingertips.
              </p>
              <Link to="/countries" className="btn btn-primary btn-lg">
                Explore Now
              </Link>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/atlas.png"
                alt="Atlas Preview"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container my-5">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="🔍 Search for a country..."
          onFocus={() => (window.location.href = "/countries")}
        />
      </div>

      {/* Animated Stats */}
      <div className="container text-center my-5">
        <div className="row g-4">
          <div className="col-md-3 col-3"><h3 className="fw-bold">195+</h3><p>Countries</p></div>
          <div className="col-md-3 col-3"><h3 className="fw-bold">7</h3><p>Continents</p></div>
          <div className="col-md-3 col-3"><h3 className="fw-bold">24+</h3><p>Timezones</p></div>
          <div className="col-md-3 col-3"><h3 className="fw-bold">1000+</h3><p>Languages</p></div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container my-5 text-center">
        <h5 className="mb-4">🧭 How Atlas Works</h5>
        <div className="row">
          <div className="col-md-4 col-4">
            <div className="card border-0">
              <div className="card-body">
                <h6>1. Search</h6>
                <p>Find your favorite country or continent.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-4 mb-4 mb-md-0">
            <div className="card border-0">
              <div className="card-body">
                <h6>2. Explore</h6>
                <p>View flags, capital, timezone, and more.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-4  mb-4 mb-md-0">
            <div className="card border-0">
              <div className="card-body">
                <h6>3. Learn</h6>
                <p>Understand geography, culture, and trivia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Slider */}
      <CountrySlider />

      {/* User Testimonials */}
      <div className="container my-5">
        <h5 className="text-center mb-4  ">💬 What Users Say</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <p>“Atlas helped me learn about 30 countries in a week!”</p>
              <small>— Aarav, Student</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <p>“Best app for understanding flags and geography!”</p>
              <small>— Priya, Teacher</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <p>“My kids love exploring new countries each day.”</p>
              <small>— Rahul, Parent</small>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA Button */}
      <Link
        to="/countries"
        className="btn btn-primary btn-lg position-fixed bottom-0 end-0 m-4 shadow"
      >
        🌍 Explore
      </Link>

      {/* Footer */}
      <footer className="text-muted text-center mt-5 border-top py-4">
        <small>
          &copy; {new Date().getFullYear()} Atlas. All rights reserved. |
          <Link to="/about" className="text-decoration-none ms-1">About</Link>
        </small>
      </footer>
    </>
  );
}

export default Index;
