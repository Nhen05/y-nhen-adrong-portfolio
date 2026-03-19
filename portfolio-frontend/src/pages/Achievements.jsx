import React, { useEffect, useState } from "react";
import { getAchievements } from "../services/achievementService";
import "./Achievements.css";

const Achievements = () => {

  const [certs, setCerts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchAchievements();
  }, [filters]);

  const fetchAchievements = async () => {
    try {
      const data = await getAchievements(filters);
      setCerts(data);
    } catch (error) {
      console.error("Error loading achievements:", error);
    }
  };

  const handleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  const handleType = (type) => {
    setFilters(prev => ({
      ...prev,
      type
    }));
  };

  return (
    <div className="achievements-container container mt-4">

      <h2 className="fw-bold mb-2">Achievements</h2>

      <p className="section-desc">
        A curated collection of certificates and badges I’ve earned throughout my professional and academic journey.
      </p>

      <hr className="dashed-hr" />

      {/* Total + Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div className="text-muted small">
          Total: {certs.length}
        </div>

        <div className="d-flex gap-2">

          {/* Category filter */}
          <select
            className="form-select form-select-sm custom-select"
            onChange={(e) => handleCategory(e.target.value)}
          >
            <option  value="">All Category</option>
            <option  value="frontend">Frontend</option>
            <option  value="backend">Backend</option>
          </select>

          {/* Type filter */}
          <select
            className="form-select form-select-sm custom-select"
            onChange={(e) => handleType(e.target.value)}
          >
            <option  value="">All Type</option>
            <option  value="course">Course</option>
            <option  value="professional">Professional</option>
          </select>

        </div>
      </div>

      <div className="row g-4">
        {certs.map((cert) => (
          <div key={cert._id} className="col-12 col-md-6 col-lg-4">

            <div className="cert-card">

              <div className="cert-img-wrapper">
                <img
                  src={cert.certificateUrl}
                  alt={cert.name}
                  className="cert-img"
                />
              </div>

              <div className="cert-body">

                <h5 className="cert-title mt-2">
                  {cert.name}
                </h5>

                <p className="cert-org">
                  {cert.issuer}
                </p>

                <div className="cert-tags mb-4">
                  <span className="cert-tag">{cert.type}</span>
                  <span className="cert-tag">{cert.category}</span>
                </div>

                <div className="cert-footer">
                  ISSUED ON {new Date(cert.issueDate).toLocaleDateString()}
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Achievements;