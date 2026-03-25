import { useState, useEffect } from "react";
import {
  BsPlusCircle,
  BsPencil,
  BsTrash,
  BsBriefcase,
  BsGithub,
  BsGlobe,
} from "react-icons/bs";
import { Table, Button, Modal, Form, Alert, Image, Spinner } from "react-bootstrap";

// Import các service
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,  
} from "../services/projectService";
import './AdminProjects.css'
const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    imageFile: null,
    previewImage: "",
  });
  const [modalLoading, setModalLoading] = useState(false);

  // Alert state
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });

  // Fetch danh sách dự án
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects(1, 999); // lấy hết
        setProjects(data.projects || []);
      } catch (err) {
        setError("Không thể tải danh sách dự án. Kiểm tra kết nối hoặc token.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAddNew = () => {
    setIsEdit(false);
    setCurrentProject({
      title: "",
      description: "",
      tech: "",
      github: "",
      demo: "",
      imageFile: null,
      previewImage: "",
    });
    setShowModal(true);
  };

  const handleEdit = async (project) => {
    try {
      setModalLoading(true);
      const detail = await getProjectById(project._id || project.id);

      setCurrentProject({
        ...detail,
        tech: detail.tech ? detail.tech.join(", ") : "",
        imageFile: null,
        previewImage: detail.image,
      });
      setIsEdit(true);
      setShowModal(true);
    } catch (err) {
      setAlert({ show: true, message: "Không tải được chi tiết dự án", variant: "danger" });
    } finally {
      setModalLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentProject.title.trim()) {
      setAlert({ show: true, message: "Tên dự án không được để trống!", variant: "danger" });
      return;
    }

    setModalLoading(true);

    const formData = new FormData();
    formData.append("title", currentProject.title);
    formData.append("description", currentProject.description || "");
    formData.append("tech", currentProject.tech);
    formData.append("github", currentProject.github || "");
    formData.append("demo", currentProject.demo || "");

    if (currentProject.imageFile) {
      formData.append("image", currentProject.imageFile);
    }

    try {
      if (isEdit) {
        await updateProject(currentProject._id || currentProject.id, formData);
      } else {
        await createProject(formData);
      }

      // Không cần kiểm tra result._id nữa
      // Nếu không throw error → coi như thành công
      const refreshed = await getProjects(1, 999);
      setProjects(refreshed.projects || []);

      setAlert({
        show: true,
        message: isEdit ? "Cập nhật dự án thành công!" : "Thêm dự án mới thành công!",
        variant: "success",
      });
      setShowModal(false);
    } catch (err) {
      // Lấy message chi tiết từ backend nếu có
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Lưu dự án thất bại. Vui lòng kiểm tra lại thông tin hoặc token.";

      setAlert({
        show: true,
        message: errorMsg,
        variant: "danger",
      });
      console.error("Lỗi lưu dự án:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa dự án này?")) return;

    try {
      await deleteProject(id);
      const refreshed = await getProjects(1, 999);
      setProjects(refreshed.projects || []);
      setAlert({ show: true, message: "Xóa dự án thành công!", variant: "success" });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Xóa thất bại. Có thể do token hết hạn hoặc lỗi server.";
      setAlert({ show: true, message: errorMsg, variant: "danger" });
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentProject({
        ...currentProject,
        imageFile: file,
        previewImage: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div style={{ padding: "2rem 1.5rem", background: "#0a0e17", minHeight: "100vh", color: "#f1f5f9" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontWeight: 700, color: "#3b82f6", margin: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <BsBriefcase size={32} />
          Quản lý Dự án
        </h2>
        <Button
          variant="primary"
          onClick={handleAddNew}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <BsPlusCircle size={18} />
          Thêm dự án mới
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Đang tải danh sách dự án...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && <Alert variant="danger" className="mb-4">{error}</Alert>}

      {/* Alert */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}

      {/* Bảng */}
      {!loading && !error && (
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            overflowX: "auto",
          }}
        >
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên dự án</th>
                <th>Mô tả</th>
                <th>Công nghệ</th>
                <th>GitHub</th>
                <th>Demo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Chưa có dự án nào. Hãy thêm mới!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      {project.image ? (
                        <Image
                          src={`${import.meta.env.VITE_API_URL}${project.image}`}
                          thumbnail
                          style={{ width: "80px", height: "auto", cursor: "pointer" }}
                          onClick={() => window.open(`${import.meta.env.VITE_API_URL}${project.image}`, "_blank")}
                          alt={project.title}
                        />
                      ) : (
                        "Không có ảnh"
                      )}
                    </td>
                    <td>{project.title}</td>
                    <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {project.description}
                    </td>
                    <td>
                      {project.tech?.map((t, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">
                          {t}
                        </span>
                      ))}
                    </td>
                    <td>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <BsGithub size={20} className="text-light" />
                        </a>
                      )}
                    </td>
                    <td>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <BsGlobe size={20} className="text-info" />
                        </a>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(project)}
                      >
                        <BsPencil size={16} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(project._id)}
                      >
                        <BsTrash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" backdrop="static">
        <Modal.Header closeButton style={{ background: "#1e293b", color: "#f1f5f9", borderBottom: "1px solid #334155" }}>
          <Modal.Title>{isEdit ? "Sửa dự án" : "Thêm dự án mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#0f172a", color: "#f1f5f9" }}>
          {modalLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Đang lưu...</p>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên dự án *</Form.Label>
                <Form.Control
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Công nghệ (phân cách bằng dấu phẩy)</Form.Label>
                <Form.Control
                  type="text"
                  value={currentProject.tech}
                  onChange={(e) => setCurrentProject({ ...currentProject, tech: e.target.value })}
                  placeholder="React, Node.js, MongoDB, Tailwind"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ảnh dự án</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {currentProject.previewImage && (
                  <div className="mt-3">
                    <small>Preview:</small>
                    <Image
                      src={currentProject.previewImage}
                      thumbnail
                      style={{ maxWidth: "300px", marginTop: "0.5rem", display: "block" }}
                      alt="Preview"
                    />
                  </div>
                )}
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Link GitHub</Form.Label>
                    <Form.Control
                      type="url"
                      value={currentProject.github}
                      onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Link Demo</Form.Label>
                    <Form.Control
                      type="url"
                      value={currentProject.demo}
                      onChange={(e) => setCurrentProject({ ...currentProject, demo: e.target.value })}
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer style={{ background: "#1e293b", borderTop: "1px solid #334155" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={modalLoading}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={modalLoading}>
            {modalLoading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>  
  );
};

export default AdminProjects;