import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { getIcon } from "../constants/iconConfig";
import { HiArrowRight } from "react-icons/hi";
import "./Project.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(page, 6);
        setProjects(data.projects);
        setPages(data.pages);
        console.log(projects)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [page]);

  return (
    <div className="Project text-light">
      <h2 className="fw-bold mb-2">Projects</h2>

      <p className="lead text-white-50 text-muted">
        A showcase of both private and open-source projects I’ve built or contributed to.
      </p>

      <hr style={{ border: "1px dashed" }} />

      <div className="row mt-3 g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-lg-6 col-md-12">
            <div
              className="card card-project h-100 border-0 "
            >
              <div className="project-image-block">
                <img
                  src={`${import.meta.env.VITE_API_URL}${project.image}`}
                  className="card-img-top w-100 h-100"
                  alt={project.title}
                />

                <div className="project-overlay">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project text-decoration-none"
                  >
                    View Project
                    <HiArrowRight className="nav-icon-arrow" />
                  </a>
                </div>
              </div>

              <div className="card-body p-4">
                <h6 className="card-title project-title fw-700 mb-3 text-title prevent-select">
                  {project.title}
                </h6>

                <p
                  className="card-text text-muted mb-4 prevent-select"
                  style={{ fontSize: "0.9rem" }}
                >
                  {project.description}
                </p>

                <div className="d-flex gap-3 flex-wrap">
                  {project.tech.map((tech) => {
                    const icon = getIcon(tech);

                    return icon ? (
                      <i
                        key={tech}
                        className={icon.className}
                        style={{
                          color: icon.color,
                          fontSize: "22px",
                        }}
                        title={tech}
                      ></i>
                    ) : (
                      <span key={tech}>{tech}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5 gap-2">

        <button
          className="btn btn-outline-light"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(pages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${page === index + 1 ? "btn-warning" : "btn-outline-light"
              }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-light"
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Projects;